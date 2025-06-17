interface InfoProps {
  title: string
  content: string
  className?: string
}

export default function Info({ title, content, className }: InfoProps) {
  return (
    <tr className={className}>
      <td className="font-semibold">{title}</td>
      <td className="px-4">:</td>
      <td>{content}</td>
    </tr>
  )
}
