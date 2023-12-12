import { faUserVneck } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export const ProfileButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/profile/1")}
      type="button"
      className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FontAwesomeIcon
        icon={faUserVneck}
        className="h-6 w-6"
        aria-hidden="true"
      />
    </button>
  );
};
