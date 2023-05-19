import '../globals.css'

export const metadata = {
  title: 'React Next.js App',
  description: 'Generated by create next app'
}

export default function InputFormLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
