export default function Footer() {
  return (
    <footer 
      className="bg-ink text-paper py-8 border-t border-warmline"
      style={{ backgroundImage: 'url(/assets/footer-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 text-center text-sm">
        <p>北京文化生活指南 · 让文化更近距离</p>
        <p className="mt-2 text-muted">
          资料来源：公开资料整理，开放时间、票务政策与服务设施请以官方公告或场馆现场信息为准。
        </p>
      </div>
    </footer>
  );
}
