import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-pink-500 text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/programs">Programs</Link>
      <Link href="/admission">Admission</Link>
      <Link href="/teacher-training">Teacher Training</Link>
      <Link href="/gallery">Gallery</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
