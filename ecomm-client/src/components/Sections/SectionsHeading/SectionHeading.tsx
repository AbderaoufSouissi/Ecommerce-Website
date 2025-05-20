const SectionHeading = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-wrap px-10 my-5 items-center gap-2">
      <div className="border-1 rounded bg-black w-2 h-10"></div>
      <p className="text-3xl">{title}</p>
    </div>
  );
};

export default SectionHeading;
