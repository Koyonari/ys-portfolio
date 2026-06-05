
import type { BlogPost, ContentBlock } from "@/types/blog";

export const POSTS: BlogPost[] = [
  /*{
    id: 1,
    slug: "building-my-home-lab",
    title: "Building My First Home Lab from Scratch",
    date: "Apr 12, 2025",
    dateISO: "2025-04-12",
    category: "Projects",
    readTime: "8 min",
    excerpt: "A deep dive into how I set up my first home lab with recycled hardware, pfSense, and a few sleepless nights.",
    patternType: "circuit",
    content: [
      { type: "p", text: "It started with a dusty Dell OptiPlex I pulled out of a recycling bin at school. No RAM, no storage, just a chassis and a motherboard. I figured if I was going to learn networking properly, I needed something to actually break — and this was it." },
      { type: "p", text: "The plan was simple on paper: a dedicated router running pfSense, a switch I could VLAN on, and a couple of machines to host services. In reality it took three weekends, two wrong BIOS settings, and one accidental factory reset to get there." },

      { type: "spacer" },

      { type: "h2", text: "The Hardware" },
      { type: "p", text: "I sourced most of the gear secondhand. The OptiPlex became my pfSense box after I dropped in 4GB of DDR3 and a spare SSD. For the switch I picked up a Cisco SG300-10 off Carousell for $30 — managed, fanless, and more than enough for a home setup." },

      { type: "img", src: "https://picsum.photos/seed/homelab1/900/500", alt: "Server rack with equipment", caption: "The very humble beginnings — a shelf, some zip ties, and too many cables." },

      { type: "p", text: "The second machine is an old ThinkCentre M93p running Proxmox. It's underpowered by any real standard but it handles a handful of LXC containers without complaint. TrueNAS runs in a VM off it with a couple of USB-attached drives passed through — not ideal, but it works." },

      { type: "spacer" },

      { type: "h2", text: "Networking & VLANs" },
      { type: "p", text: "This is where I spent most of my time. I split the network into four VLANs: trusted devices, IoT, servers, and a DMZ for anything internet-facing. pfSense handles the inter-VLAN routing with firewall rules that block IoT from talking to anything except the internet." },
      { type: "p", text: "Getting the SG300 to trunk correctly to pfSense took longer than I'd like to admit. The key thing I kept missing was that the native VLAN on the trunk port had to match on both sides. Once that clicked, everything else fell into place pretty quickly." },

      { type: "img", src: "https://picsum.photos/seed/homelab2/900/500", alt: "pfSense dashboard screenshot", caption: "pfSense firewall rules — cleaner than they look." },

      { type: "spacer" },

      { type: "h2", text: "Services Running" },
      { type: "p", text: "Right now the lab hosts AdGuard Home for DNS-level ad blocking across the whole network, Nginx Proxy Manager to front everything with SSL, Uptime Kuma for monitoring, and a Gitea instance I use for private repos. Nothing groundbreaking, but it's all mine and I understand every piece of it." },
      { type: "p", text: "The plan is to move toward a proper homelab with a used rack server once I have the space. But for now, a shelf in the corner and some good cable management does the job." },

      { type: "spacer" },
      { type: "hr" },
      { type: "spacer" },

      { type: "p", text: "If you're thinking about building your own — just start. The hardware doesn't need to be good. The point is to have something you can freely mess up and learn from. Everything else follows." },
    ] satisfies ContentBlock[],
  },
  {
    id: 2,
    slug: "windows-to-arch",
    title: "Windows to Arch Linux. Microsoft is ass",
    date: "Jan 03, 2025",
    dateISO: "2025-01-03",
    category: "Tech",
    readTime: "7 min",
    excerpt: "From Windows to Mint to Arch. The journey, the config grief, and my final daily driver.",
    patternType: "grid",
  },
  {
    id: 3,
    slug: "pursuit-of-greatness",
    title: "The Pursuit of Greatness",
    date: "Nov 19, 2024",
    dateISO: "2024-11-19",
    category: "Thoughts",
    readTime: "4 min",
    excerpt: "For the past few months, I've gotten obsessed about being the desire of being great. Greed, Sacrifice and Obsession.",
    patternType: "lines",
  },
  {
    id: 4,
    slug: "reflection",
    title: "Reflection on the Past 3 Years I've been in School",
    date: "Sep 01, 2024",
    dateISO: "2024-09-01",
    category: "Thoughts",
    readTime: "3 min",
    excerpt: "From failing student to bottom-high tier student, It's not enough.",
    patternType: "dots",
  }*/
];
