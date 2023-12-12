const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function FormattedDate({
  date,
  ...props
}: React.ComponentPropsWithoutRef<"time"> & { date: string | Date }) {
  const isDateString = typeof date === "string";

  return (
    <time dateTime={isDateString ? date : date.toISOString()} {...props}>
      {isDateString ? date : dateFormatter.format(date)}
    </time>
  );
}
