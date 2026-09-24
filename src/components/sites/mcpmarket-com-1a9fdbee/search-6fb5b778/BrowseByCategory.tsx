import Link from "next/link";
import { BrowseCategoryIcon } from "./icons";
import { BROWSE_CATEGORIES } from "./search-data";

export function BrowseByCategory() {
  return (
    <div className="mt-12 border-t border-[#dbdbdb] pt-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="mb-3 font-display text-xl leading-7 font-medium tracking-[-0.03em] text-[#0a0a0a] md:text-2xl md:leading-8">
          Browse by Category
        </h2>
        <p className="text-base leading-6 text-[#616161]">Explore MCP servers organized by functionality and use case.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BROWSE_CATEGORIES.map((category) => (
          <Link key={category.href} href={category.href} className="group">
            <div className="h-full rounded-[12px] border border-[rgba(219,219,219,0.5)] bg-[rgba(251,251,251,0.5)] text-[#0a0a0a] backdrop-blur-sm transition-all duration-200 group-hover:border-[rgba(10,10,10,0.2)] group-hover:bg-[rgba(245,245,245,0.5)]">
              <div className="flex flex-col gap-1.5 p-6 pb-2">
                <h3 className="flex items-center font-display text-lg leading-7 font-normal tracking-[-0.035em]">
                  <div className="mr-3 rounded-[12px] bg-[rgba(10,10,10,0.1)] p-2 transition-colors group-hover:bg-[rgba(10,10,10,0.2)]">
                    <BrowseCategoryIcon name={category.icon} className="size-5 text-[#0a0a0a]" />
                  </div>
                  {category.title}
                </h3>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm leading-5 text-[#616161]">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
