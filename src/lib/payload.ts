import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Article, Service, Portfolio, ArticlesCategory, Social, Media, Faq } from '@/payload-types'

// Simplified types for client components (avoiding complex nested objects)
export interface SimplifiedArticle {
  id: number
  title: string
  description?: string | null
  thumbnail: {
    url: string
    alt: string
  } | null
  author: string
  readingTime: number
  slug: string
  createdAt: string
  categories: {
    id: number
    name: string
    slug: string
  }[]
  tags?: {
    id: number
    name: string
  }[]
}

export interface SimplifiedCategory {
  id: number
  name: string
  slug: string
}

export interface SimplifiedService {
  id: number
  title: string
  description?: string | null
  image: {
    url: string
    alt: string
  } | null
  features: string[]
  order: number
}

export interface SimplifiedPortfolio {
  id: number
  title: string
  description?: string | null
  image: {
    url: string
    alt: string
  } | null
  url?: string | null
  order: number
}

export interface SimplifiedFaq {
  question: string
  answer: string
}

export interface SimplifiedEmployee {
  name: string
  position: string
  bio?: string | null
  image?: Media | null
}

export interface SocialLinkItem {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'tiktok' | 'reddit' | 'whatsapp' | 'phone' | 'email' | 'other'
  url?: string
  text: string
}

// Type definitions for page-specific data
export interface HomePageData {
  services: SimplifiedService[]
  portfolios: SimplifiedPortfolio[]
  socials: SocialLinkItem[]
}

export interface ArticlePageData {
  articles: SimplifiedArticle[]
  categories: SimplifiedCategory[]
  totalPages: number
}

export interface ArticlePostData {
  article: Article
  relatedArticles: Pick<Article, 'id' | 'title' | 'thumbnail' | 'slug' | 'readingTime' | 'author' | 'createdAt'>[]
}

// Helper functions to transform complex data to simplified format
function transformServiceForClient(service: any): SimplifiedService {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    image: service.image ? {
      url: (typeof service.image === 'object' ? service.image.url : '') || '',
      alt: (typeof service.image === 'object' ? service.image.alt : '') || service.title
    } : null,
    features: service.features?.map((f: any) => typeof f === 'object' ? f.feature : f) || [],
    order: service.order
  }
}

function transformPortfolioForClient(portfolio: any): SimplifiedPortfolio {
  return {
    id: portfolio.id,
    title: portfolio.title,
    description: portfolio.description,
    image: portfolio.image ? {
      url: (typeof portfolio.image === 'object' ? portfolio.image.url : '') || '',
      alt: (typeof portfolio.image === 'object' ? portfolio.image.alt : '') || portfolio.title
    } : null,
    url: portfolio.url,
    order: portfolio.order
  }
}

function transformArticleForClient(article: any): SimplifiedArticle {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    thumbnail: article.thumbnail ? {
      url: (typeof article.thumbnail === 'object' ? article.thumbnail.url : '') || '',
      alt: (typeof article.thumbnail === 'object' ? article.thumbnail.alt : '') || article.title
    } : null,
    author: typeof article.author === 'object' ? article.author.name : article.author,
    readingTime: article.readingTime,
    slug: article.slug,
    createdAt: article.createdAt,
    categories: article.categories?.map((cat: any) => ({
      id: typeof cat === 'object' ? cat.id : cat,
      name: typeof cat === 'object' ? cat.name : "Unknown",
      slug: typeof cat === 'object' ? cat.slug : 'unknown'
    })) || [],
    tags: article.tags?.map((tag: any) => ({
      id: typeof tag === 'object' ? tag.id : tag,
      name: typeof tag === 'object' ? tag.name : 'Unknown'
    })) || []
  }
}

// Data fetching functions
export async function getHomePageData(): Promise<HomePageData> {
  const payload = await getPayload({ config: configPromise })

  const [servicesRes, portfoliosRes, socialsRes] = await Promise.all([
    payload.find({
      collection: 'services',
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        features: true,
        order: true
      },
      depth: 1,
      sort: 'order'
    }),
    payload.find({
      collection: 'portfolios',
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        url: true,
        order: true
      },
      depth: 1,
      sort: 'order',
      limit: 6 // Only fetch featured portfolios for home page
    }),
    payload.findGlobal({
      slug: 'socials',
      select: {
        links: {
          text: true,
          platform: true
        }
      },
      depth: 0
    })
  ])

  const filteredLinks = (socialsRes.links || []).filter(
    (link: any) =>
      link.platform === 'phone' ||
      link.platform === 'email' ||
      link.platform === 'address'
  )

  return {
    services: servicesRes.docs.map(transformServiceForClient),
    portfolios: portfoliosRes.docs.map(transformPortfolioForClient),
    socials: filteredLinks.map((link: SocialLinkItem) => ({
      platform: link.platform,
      text: link.text
    })) as Social['links']
  }
}

export async function getArticlePageData(page: number = 1, limit: number = 6, categorySlug?: string, searchTerm?: string): Promise<ArticlePageData> {
  const payload = await getPayload({ config: configPromise })

  const where: any = {}

  if (categorySlug && categorySlug !== 'all') {
    where['categories.slug'] = {
      equals: categorySlug
    }
  }

  if (searchTerm) {
    where.or = [
      {
        title: {
          contains: searchTerm
        }
      },
      {
        description: {
          contains: searchTerm
        }
      },
      {
        'tags.name': {
          contains: searchTerm
        }
      }
    ]
  }

  const [articlesRes, categoriesRes] = await Promise.all([
    payload.find({
      collection: 'articles',
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        author: true,
        readingTime: true,
        slug: true,
        createdAt: true,
        categories: true,
        tags: true
      },
      depth: 2,
      page,
      limit,
      where,
      sort: '-createdAt'
    }),
    payload.find({
      collection: 'articles-categories',
      select: {
        id: true,
        name: true,
        slug: true
      },
      limit: 100
    })
  ])

  return {
    articles: articlesRes.docs.map(transformArticleForClient),
    categories: categoriesRes.docs.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    })),
    totalPages: articlesRes.totalPages
  }
}

export async function getArticlePostData(slug: string): Promise<ArticlePostData | null> {
  const payload = await getPayload({ config: configPromise })

  const articleRes = await payload.find({
    collection: 'articles',
    where: {
      slug: {
        equals: slug
      }
    },
    depth: 2,
    limit: 1
  })

  if (articleRes.docs.length === 0) {
    return null
  }

  const article = articleRes.docs[0]

  // Get related articles from same categories (without content field)
  const categoryIds = article.categories?.map((cat: any) =>
    typeof cat === 'object' ? cat.id : cat
  ) || [];

  const relatedArticlesRes = await payload.find({
    collection: 'articles',
    select: {
      id: true,
      title: true,
      thumbnail: true,
      slug: true,
      readingTime: true,
      author: true,
      createdAt: true
    },
    where: {
      and: [
        {
          id: {
            not_equals: article.id
          }
        },
        {
          'categories': {
            in: categoryIds
          }
        }
      ]
    },
    depth: 1,
    limit: 3,
    sort: '-createdAt'
  })

  return {
    article,
    relatedArticles: relatedArticlesRes.docs
  }
}

export async function getSocialLinks(): Promise<SocialLinkItem[]> {
  const payload = await getPayload({ config: configPromise })

  try {
    const social = await payload.findGlobal({
      slug: 'socials',
      select: {
        links: {
          text: true,
          url: true,
          platform: true
        }
      },
      depth: 0
    })

    return (social.links || []).map((link: any) => ({
      platform: link.platform,
      url: link.url,
      text: link.text
    }))
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}

export async function getSocialLinksByPlatform(platform: SocialLinkItem['platform']): Promise<SocialLinkItem[]> {
  const links = await getSocialLinks();
  return links.filter(link => link.platform === platform);
}

export async function getFaqs(): Promise<SimplifiedFaq[]> {
  const payload = await getPayload({ config: configPromise })

  try {
    const faqs = await payload.find({
      collection: 'faqs',
      select: {
        question: true,
        answer: true
      },
      sort: 'order',
      limit: 0
    })

    return faqs.docs.map((faq: any) => ({
      question: faq.question,
      answer: faq.answer
    }))
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}

export async function getEmployees(): Promise<SimplifiedEmployee[]> {
  const payload = await getPayload({ config: configPromise })

  try {
    const employees = await payload.find({
      collection: 'employees',
      select: {
        name: true,
        position: true,
        bio: true,
        image: true
      },
      sort: 'order',
      limit: 0
    })

    return employees.docs
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}
