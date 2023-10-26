import Link from "next/link";

export default function Category({ categoryz }) {
  return (
    <div
      className="border bg-white h-64  rounded-[20px] flex flex-col gap-5 relative"
      style={{
        gridColumn: `span ${categoryz.col} / span ${categoryz.col}`,
      }}
    >
      <div className="text-[22px] font-bold absolute top-4 left-4">{categoryz.name}</div>
      <Link href={`/categorys/${categoryz.id}`} className="h-full">
        <img className="h-full object-cover ml-auto p-4 aspect-square" src={categoryz.image}></img>
      </Link>
    </div>
  );
}
