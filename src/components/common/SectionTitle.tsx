export default function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-2 text-sm font-black text-cinnabar">{eyebrow}</p>}
      <h2 className="text-2xl font-black text-ink md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl text-sm leading-7 text-muted md:text-base">{description}</p>}
    </div>
  );
}
