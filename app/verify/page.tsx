"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const { userId, courseId } = router.query;

  const [verificationStatus, setVerificationStatus] = useState<{
    loading: boolean;
    valid: boolean | null;
    message: string;
  }>({
    loading: true,
    valid: null,
    message: "",
  });

  useEffect(() => {
    if (!userId || !courseId) return;

    async function verifyCertificate() {
      try {
        const response = await fetch(`/api/courses/${courseId}/verify`);
        if (response.ok) {
          setVerificationStatus({
            loading: false,
            valid: true,
            message: "Certificate is valid. Congratulations!",
          });
        } else {
          const errorData = await response.json();
          setVerificationStatus({
            loading: false,
            valid: false,
            message: errorData.error || "Invalid certificate",
          });
        }
      } catch (error) {
        console.error("Error verifying certificate:", error);
        setVerificationStatus({
          loading: false,
          valid: false,
          message: "An error occurred while verifying the certificate.",
        });
      }
    }

    verifyCertificate();
  }, [userId, courseId]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Certificate Verification</h2>
      {verificationStatus.loading ? (
        <p className="text-center">Verifying certificate...</p>
      ) : verificationStatus.valid ? (
        <p className="text-green-500 text-center font-medium">{verificationStatus.message}</p>
      ) : (
        <p className="text-red-500 text-center font-medium">{verificationStatus.message}</p>
      )}
    </div>
  );
}
