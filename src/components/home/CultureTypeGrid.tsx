import { useNavigate } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { cultureTypes } from "../../data/categories";

export default function CultureTypeGrid() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <SectionTitle title="按文化类型发现资源" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {cultureTypes.map(({ icon: Icon, image, title, desc, stat, type }) => (
          <button key={title} onClick={() => navigate(`/resources?type=${encodeURIComponent(String(type))}`)} className="card p-4 text-center">
            {image ? (
              <img
                src={image}
                alt={title}
                className="mx-auto h-14 w-14 object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <Icon className="mx-auto text-cinnabar" size={32} />
            )}
            <h3 className="mt-3 font-black text-ink whitespace-nowrap">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-muted line-clamp-2">{desc}</p>
            <span className="mt-3 inline-flex rounded-full bg-sand px-3 py-1 text-xs font-black text-verify">{stat}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
