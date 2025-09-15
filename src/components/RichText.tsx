// src/components/RichText/index.tsx
'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

interface RichTextProps {
  content: any
  className?: string
  enableGutter?: boolean
}

interface TextNode {
  type: 'text'
  text: string
  format?: number
  detail?: number
  mode?: string
  style?: string
  version?: number
}

interface ParagraphNode {
  type: 'paragraph'
  children: TextNode[]
  direction?: string
  format?: string
  indent?: number
  version?: number
  textFormat?: number
  textStyle?: string
}

interface HeadingNode {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: TextNode[]
  direction?: string
  format?: string
  indent?: number
  version?: number
}

interface ListNode {
  type: 'list'
  listType: 'bullet' | 'number'
  children: ListItemNode[]
  direction?: string
  format?: string
  indent?: number
  version?: number
}

interface ListItemNode {
  type: 'listitem'
  children: (TextNode | ParagraphNode)[]
  direction?: string
  format?: string
  indent?: number
  version?: number
  value?: number
}

interface MediaBlockNode {
  type: 'block'
  fields: {
    blockType: 'mediaBlock'
    media: any
  }
  version?: number
}

type RichTextNode = ParagraphNode | HeadingNode | ListNode | ListItemNode | MediaBlockNode

interface RootNode {
  type: 'root'
  children: RichTextNode[]
  direction?: string
  format?: string
  indent?: number
  version?: number
}

const renderTextNode = (node: TextNode, index: number): React.ReactNode => {
  let content: React.ReactNode = node.text

  // Handle text formatting based on format flags
  if (node.format) {
    if (node.format & 1) { // Bold
      content = <strong>{content}</strong>
    }
    if (node.format & 2) { // Italic
      content = <em>{content}</em>
    }
    if (node.format & 4) { // Strikethrough
      content = <s>{content}</s>
    }
    if (node.format & 8) { // Underline
      content = <u>{content}</u>
    }
  }

  return <span key={index}>{content}</span>
}

const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {node.children.map((child, childIndex) => renderTextNode(child, childIndex))}
        </p>
      )

    case 'heading':
      const HeadingTag = node.tag
      const headingClasses = {
        h1: 'text-4xl font-bold mb-6 mt-8',
        h2: 'text-3xl font-bold mb-4 mt-8',
        h3: 'text-2xl font-bold mb-4 mt-6',
        h4: 'text-xl font-bold mb-3 mt-6',
        h5: 'text-lg font-bold mb-3 mt-4',
        h6: 'text-base font-bold mb-2 mt-4'
      }

      return (
        <HeadingTag key={index} className={headingClasses[node.tag]}>
          {node.children.map((child, childIndex) => renderTextNode(child, childIndex))}
        </HeadingTag>
      )

    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      const listClasses = node.listType === 'bullet' ? 'list-disc' : 'list-decimal'

      return (
        <ListTag key={index} className={`${listClasses} mb-4 pl-6 space-y-2`}>
          {node.children.map((child, childIndex) => renderNode(child, childIndex))}
        </ListTag>
      )

    case 'listitem':
      return (
        <li key={index} className="leading-relaxed">
          {node.children.map((child, childIndex) => {
            if (child.type === 'text') {
              return renderTextNode(child, childIndex)
            }
            return renderNode(child as RichTextNode, childIndex)
          })}
        </li>
      )

    case 'block':
      if (node.fields.blockType === 'mediaBlock') {
        return (
          <MediaBlock
            key={index}
            media={{...node.fields.media, caption: node.fields.caption}}
            className="my-8"
          />
        )
      }
      return null

    default:
      return null
  }
}

export const RichText: React.FC<RichTextProps> = ({
                                                    content,
                                                    className,
                                                    enableGutter = true
                                                  }) => {
  if (!content || !content.root) {
    return null
  }

  const rootNode = content.root as RootNode

  return (
    <div
      className={cn(
        'rich-text, text-black',
        {
          'container': enableGutter,
        },
        className
      )}
    >
      {rootNode.children.map((node, index) => renderNode(node, index))}
    </div>
  )
}

export default RichText
