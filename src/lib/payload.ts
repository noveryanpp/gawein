import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Article, Service, Portfolio, ArticlesCategory, Social, Media, Faq } from '@/payload-types'


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
  slug: string
  description?: string | null
  content: any
  image: {
    url: string
    alt: string
  } | null
  features: { feature: string }[]
  ctaText?: string | null
  ctaLink?: string | null
  order: number
}


export interface SimplifiedPortfolio {
  id: number
  title: string
  slug: string
  description?: string | null
  image: {
    url: string
    alt: string
  } | null
  service: {
    id: number
    title: string
    slug: string
  }
  tags: {
    id: number
    name: string
    slug: string
  }[]
  client?: string | null
  completedAt?: string | null
  technologies: { technology: string }[]
  url?: string | null
  order: number
}


export interface FullPortfolio {
  id: number
  title: string
  slug: string
  description?: string | null
  content: any
  image: {
    url: string
    alt: string
  } | null
  gallery: {
    image: {
      id: number
      url: string
      alt: string
    }
    caption?: string | null
  }[]
  service: {
    id: number
    title: string
    slug: string
  }
  tags: {
    id: number
    name: string
    slug: string
  }[]
  client?: string | null
  completedAt?: string | null
  technologies: { technology: string }[]
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
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'tiktok' | 'reddit' | 'whatsapp' | 'phone' | 'email' | 'location' | 'other'
  url?: string
  text: string
  icon?: {
    url: string
    alt: string
  } | null
}

export interface FooterData {
  socials: SocialLinkItem[]
  services: SimplifiedService[]
}

export interface HomePageData {
  services: SimplifiedService[]
  portfolios: SimplifiedPortfolio[]
  socials: SocialLinkItem[]
  faqs: SimplifiedFaq[]
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

export interface ServicesPageData {
  services: SimplifiedService[]
}

export interface PortfolioPageData {
  portfolios: SimplifiedPortfolio[]
  services: SimplifiedCategory[]
  totalPages: number
}

export interface SinglePortfolioData {
  portfolio: FullPortfolio
}


function transformServiceForClient(service: any): SimplifiedService {
  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    description: service.description,
    content: service.content,
    image: service.image ? {
      url: (typeof service.image === 'object' ? service.image.url : '') || '',
      alt: (typeof service.image === 'object' ? service.image.alt : '') || service.title
    } : null,
    features: service.features?.map((f: any) => ({ feature: typeof f === 'object' ? f.feature : f })) || [],
    ctaText: service.ctaText,
    ctaLink: service.ctaLink,
    order: service.order
  }
}

function transformPortfolioForClient(portfolio: any): SimplifiedPortfolio {
  return {
    id: portfolio.id,
    title: portfolio.title,
    slug: portfolio.slug,
    description: portfolio.description,
    image: portfolio.image ? {
      url: (typeof portfolio.image === 'object' ? portfolio.image.url : '') || '',
      alt: (typeof portfolio.image === 'object' ? portfolio.image.alt : '') || portfolio.title
    } : null,
    service: {
      id: typeof portfolio.service === 'object' ? portfolio.service.id : portfolio.service,
      title: typeof portfolio.service === 'object' ? portfolio.service.title : 'Unknown',
      slug: typeof portfolio.service === 'object' ? portfolio.service.slug : 'unknown'
    },
    tags: portfolio.tags?.map((tag: any) => ({
      id: typeof tag === 'object' ? tag.id : tag,
      name: typeof tag === 'object' ? tag.name : 'Unknown',
      slug: typeof tag === 'object' ? tag.slug : 'unknown'
    })) || [],
    client: portfolio.client,
    completedAt: portfolio.completedAt,
    technologies: portfolio.technologies?.map((tech: any) => ({ technology: typeof tech === 'object' ? tech.technology : tech })) || [],
    url: portfolio.url,
    order: portfolio.order
  }
}

function transformFullPortfolioForClient(portfolio: any): FullPortfolio {
  return {
    id: portfolio.id,
    title: portfolio.title,
    slug: portfolio.slug,
    description: portfolio.description,
    content: portfolio.content,
    image: portfolio.image ? {
      url: (typeof portfolio.image === 'object' ? portfolio.image.url : '') || '',
      alt: (typeof portfolio.image === 'object' ? portfolio.image.alt : '') || portfolio.title
    } : null,
    gallery: portfolio.gallery?.map((item: any) => ({
      image: {
        id: typeof item.image === 'object' ? item.image.id : item.image,
        url: (typeof item.image === 'object' ? item.image.url : '') || '',
        alt: (typeof item.image === 'object' ? item.image.alt : '') || 'Gallery image'
      },
      caption: item.caption || null
    })) || [],
    service: {
      id: typeof portfolio.service === 'object' ? portfolio.service.id : portfolio.service,
      title: typeof portfolio.service === 'object' ? portfolio.service.title : 'Unknown',
      slug: typeof portfolio.service === 'object' ? portfolio.service.slug : 'unknown'
    },
    tags: portfolio.tags?.map((tag: any) => ({
      id: typeof tag === 'object' ? tag.id : tag,
      name: typeof tag === 'object' ? tag.name : 'Unknown',
      slug: typeof tag === 'object' ? tag.slug : 'unknown'
    })) || [],
    client: portfolio.client,
    completedAt: portfolio.completedAt,
    technologies: portfolio.technologies?.map((tech: any) => ({ technology: typeof tech === 'object' ? tech.technology : tech })) || [],
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

export async function getFooterData(): Promise<FooterData> {
  const payload = await getPayload({ config: configPromise })

  const [socialsRes, servicesRes] = await Promise.all([
    payload.findGlobal({
      slug: 'socials',
      select: {
        links: {
          text: true,
          url: true,
          platform: true,
          icon: true
        }
      },
      depth: 1
    }),
    payload.find({
      collection: 'services',
      select: {
        id: true,
        title: true,
        slug: true,
        order: true
      },
      depth: 0,
      sort: 'order'
    })
  ])

  const filteredLinks = (socialsRes.links || []).filter(
    (link: any) =>
      link.platform !== 'address' &&
      link.platform !== 'working-hours'
  )

  return {
    socials: filteredLinks.map((link: any) => ({
      platform: link.platform,
      url: link.url,
      text: link.text,
      icon: link.icon
    })) as SocialLinkItem[],
    services: servicesRes.docs.map(service => ({
      id: service.id,
      title: service.title,
      slug: service.slug,
      order: service.order
    }))
  }
}


export async function getHomePageData(): Promise<HomePageData> {
  const payload = await getPayload({ config: configPromise })

  const [servicesRes, portfoliosRes, socialsRes, faqsRes] = await Promise.all([
    payload.find({
      collection: 'services',
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        image: true,
        features: true,
        ctaText: true,
        ctaLink: true,
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
        slug: true,
        description: true,
        image: true,
        service: true,
        tags: true,
        client: true,
        completedAt: true,
        technologies: true,
        url: true,
        order: true
      },
      depth: 2,
      sort: 'order',
      limit: 6
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
    }),
    getFaqs()
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
    })) as Social['links'],
    faqs: faqsRes
  }
}


export async function getServicesPageData(): Promise<ServicesPageData> {
  const payload = await getPayload({ config: configPromise })

  const servicesRes = await payload.find({
    collection: 'services',
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      image: true,
      features: true,
      ctaText: true,
      ctaLink: true,
      order: true
    },
    depth: 1,
    sort: 'order'
  })

  return {
    services: servicesRes.docs.map(transformServiceForClient)
  }
}


export async function getPortfolioPageData(page: number = 1, limit: number = 9, serviceSlug?: string, searchTerm?: string): Promise<PortfolioPageData> {
  const payload = await getPayload({ config: configPromise })

  const where: any = {}

  if (serviceSlug && serviceSlug !== 'all') {
    where['service.slug'] = {
      equals: serviceSlug
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
        client: {
          contains: searchTerm
        }
      },
      {
        'tags.name': {
          contains: searchTerm
        }
      },
      {
        'technologies.technology': {
          contains: searchTerm
        }
      }
    ]
  }

  const [portfoliosRes, servicesRes] = await Promise.all([
    payload.find({
      collection: 'portfolios',
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        service: true,
        tags: true,
        client: true,
        completedAt: true,
        technologies: true,
        url: true,
        order: true
      },
      depth: 2,
      page,
      limit,
      where,
      sort: '-order'
    }),
    payload.find({
      collection: 'services',
      select: {
        id: true,
        title: true,
        slug: true
      },
      limit: 100
    })
  ])

  return {
    portfolios: portfoliosRes.docs.map(transformPortfolioForClient),
    services: servicesRes.docs.map(service => ({
      id: service.id,
      title: service.title,
      slug: service.slug
    })),
    totalPages: portfoliosRes.totalPages
  }
}


export async function getSinglePortfolioData(slug: string): Promise<SinglePortfolioData | null> {
  const payload = await getPayload({ config: configPromise })

  const portfolioRes = await payload.find({
    collection: 'portfolios',
    where: {
      slug: {
        equals: slug
      }
    },
    depth: 2,
    limit: 1
  })

  if (portfolioRes.docs.length === 0) {
    return null
  }

  const portfolio = portfolioRes.docs[0]

  return {
    portfolio: transformFullPortfolioForClient(portfolio)
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
    console.error('Error fetching faqs:', error)
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
    console.error('Error fetching employees:', error)
    return []
  }
}
