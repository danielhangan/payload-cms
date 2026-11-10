'use client'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

const LABELS: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
}

// Status column in list views: a coloured pill instead of plain text.
export default function StatusCell({ cellData }: DefaultCellComponentProps) {
  const value = typeof cellData === 'string' ? cellData : ''
  if (!value) return <span className="dcms-muted">—</span>
  return <span className={`dcms-status dcms-status--${value}`}>{LABELS[value] ?? value}</span>
}
