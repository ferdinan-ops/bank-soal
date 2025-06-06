interface InfoProps {
  title: string
  content: string
}

export default function Info({ title, content }: InfoProps) {
  return (
    <tr>
      <td className="font-semibold">{title}</td>
      <td className="px-4">:</td>
      <td>{content}</td>
    </tr>
  )
}
