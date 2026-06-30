import { FileText, FileSpreadsheet, FileImage, FileArchive, File } from 'lucide-react'

const iconMap = {
  pdf:  { icon: FileText,       color: 'text-red-500' },
  doc:  { icon: FileText,       color: 'text-blue-500' },
  docx: { icon: FileText,       color: 'text-blue-500' },
  xls:  { icon: FileSpreadsheet, color: 'text-green-500' },
  xlsx: { icon: FileSpreadsheet, color: 'text-green-500' },
  ppt:  { icon: FileImage,      color: 'text-orange-500' },
  pptx: { icon: FileImage,      color: 'text-orange-500' },
  txt:  { icon: FileText,       color: 'text-text-300' },
  md:   { icon: FileText,       color: 'text-text-300' },
  zip:  { icon: FileArchive,    color: 'text-yellow-500' },
  gz:   { icon: FileArchive,    color: 'text-yellow-500' },
}

function getExt(url) {
  const match = url.match(/\.(\w+)(?:\?.*)?$/i)
  return match ? match[1].toLowerCase() : ''
}

function getFilename(url) {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export default function DocumentCard({ href, children }) {
  const ext = getExt(href)
  const info = iconMap[ext] || { icon: File, color: 'text-text-300' }
  const Icon = info.icon
  const filename = getFilename(href)
  const label = children && !children.startsWith('http') ? children : filename

  return (
    <div className="flex mt-3 mb-2 w-full">
      <div className="w-0.5 rounded-full bg-bg-300 shrink-0 mr-3" />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 flex-1 min-w-0 px-4 py-3 rounded-xl border border-bg-200 bg-bg-100 hover:bg-bg-200 transition-colors no-underline group"
      >
        <div className={`size-10 rounded-lg border border-bg-200 flex items-center justify-center shrink-0 ${info.color}`}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-100 truncate">{label}</p>
          <p className="text-xs text-text-400 mt-0.5">{ext.toUpperCase()} file</p>
        </div>
        <span className="text-xs text-text-300 border border-bg-200 rounded-md px-3 py-1 group-hover:bg-bg-0 transition-colors shrink-0">
          Download
        </span>
      </a>
    </div>
  )
}
