import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";

export const navItem = [
  {
    name: "Stake",
    href: "/",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="swap-arrows"
        className="w-5 h-5"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fontSize="20px"
        display="inline-block"
      >
        <path
          fill="currentColor"
          d="M111 7c9.4-9.4 24.6-9.4 33.9 0l88 88c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47V360c0 39.8 32.2 72 72 72s72-32.2 72-72V152c0-66.3 53.7-120 120-120s120 53.7 120 120l0 278.1 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-88-88c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47V152c0-39.8-32.2-72-72-72s-72 32.2-72 72V360c0 66.3-53.7 120-120 120s-120-53.7-120-120l0-278.1L57 129c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L111 7z"
        ></path>
      </svg>
    ),
  },
  { name: "Dashboard", href: "/dashboard" },

  { name: "Bridge", href: "/bridge" },
];

export const socials = [
  {
    name: "Twitter",
    href: "https://x.com/zkhelixlabs",
    icon: FaXTwitter,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/zkhelixlabs",
    icon: FaLinkedin,
  },
  {
    name: "Github",
    href: "https://github.com/HelixLabsDev",
    icon: FaGithub,
  },
  {
    name: "Discord",
    href: "https://discord.com/invite/MKPfssK985",
    icon: FaDiscord,
  },
];

export const data = {
  protocol: "MockToken",
  deposit: "Paid",
  asset: "MTK",
  balance: "",
  other: "",
};
