interface Props {
  id: string;
  num: string;
  label: string;
  title: string;
  titleEm: string;
  sub: string;
  screen: string;
}

export function PlaceholderSection({
  id,
  num,
  label,
  title,
  titleEm,
  sub,
  screen,
}: Props) {
  return (
    <section id={id} className="screen" data-screen-label={screen}>
      <div className="stub-label">
        <span className="num">{num}</span>
        <span>— {label}</span>
      </div>
      <h2 className="stub-title">
        {title} <em>{titleEm}</em>
      </h2>
      <p className="stub-sub">{sub}</p>
      <span className="coming-soon">◊ In progress · Design coming next</span>
    </section>
  );
}
