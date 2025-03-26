"use client";
import { Container, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Container className="text-center d-flex flex-column align-items-center justify-content-center vh-100">
      {/* 404 Image */}
      <Image src="/images/error.png" alt="404 Not Found" width={400} height={200} />

      {/* Message */}
      <h2 className="mt-4 fw-bold text-dark">Sorry, We Can't Find The Page You're Looking For</h2>

      {/* Back to Home Button */}
      <Button variant="danger" className="mt-3 px-4 fw-bold" onClick={() => router.push("/")}>
        Back To Home Page →
      </Button>
    </Container>
  );
}
