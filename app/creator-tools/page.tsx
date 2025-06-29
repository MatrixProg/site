
import { QRGenerator } from '@/components/qr-generator'
import { ThumbnailGenerator } from '@/components/thumbnail-generator'
import { LogoMaker } from '@/components/logo-maker'

export default function CreatorToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Tools</h1>
      <div className="space-y-8">
        <QRGenerator />
        <ThumbnailGenerator />
        <LogoMaker />
      </div>
    </div>
  )
}
