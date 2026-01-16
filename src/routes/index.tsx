import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import {
  Activity,
  BarChart,
  Eye,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Phone as PhoneIcon,
  Send,
  Twitter,
  X,
} from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}

function AnimatedSection({
  children,
  className,
  animation = 'fade-up',
}: {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale'
}) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const animations = {
    'fade-up': 'animate-fade-up',
    'fade-left': 'animate-fade-left',
    'fade-right': 'animate-fade-right',
    scale: 'animate-scale',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? animations[animation] : 'opacity-0 translate-y-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

const websiteData = {
  title: 'AIIH',
  meta: {
    description: '',
    keywords: '',
    viewport: 'width=device-width, initial-scale=1.0',
  },
  theme: {
    name: 'Reveal',
    author: 'BootstrapMade',
  },
  topBar: {
    contactInfo: {
      email: 'aiih.sci@ku.th',
      phone: '+66 2-562-5444',
    },
    socialLinks: [
      'twitter',
      'facebook',
      'instagram',
      'google-plus',
      'linkedin',
    ],
  },
  header: {
    logo: {
      text: 'AIIH',
      href: '#body',
    },
    navigation: [
      { text: 'Home', href: '#body' },
      { text: 'About Us', href: '#about' },
      { text: 'Why AIIH?', href: '#services' },
      { text: 'Projects', href: '#portfolio' },
      { text: 'Teams', href: '#team' },
      { text: 'Contact', href: '#contact' },
    ],
  },
  intro: {
    backgroundImages: [
      'img/intro-carousel/1.png',
      'img/intro-carousel/2.png',
      'img/intro-carousel/3.png',
      'img/intro-carousel/1.png',
      'img/intro-carousel/2.png',
    ],
  },
  sections: {
    about: {
      title: 'ความเป็นมาและความสำคัญ',
      content: [
        'ยุทธศาสตร์ชาติ 20 ปี (พ.ศ. 2561 - 2580) ได้มุ่งเน้นส่งเสริมการวิจัยพัฒนาอุตสาหกรรมเทคโนโลยีดิจิทัลและปัญญาประดิษฐ์ (AI) ให้เป็นฐานในการขับเคลื่อนประเทศ โดยการนำเทคโนโลยีปัญญาประดิษฐ์มาสร้างนวัตกรรมเพื่อเพิ่มศักยภาพและความสามารถในการแข่งขันของประเทศทั้งในภาคการเกษตร ภาคอุตสาหกรรม และการแพทย์และสาธารณสุข ประกอบกับมหาวิทยาลัยเกษตรศาสตร์ วิทยาลัยแพทยศาสตร์พระมงกุฎเกล้า และโรงพยาบาลพระมงกุฎเกล้า ได้มีความร่วมมือทางวิชาการร่วมกันมายาวนาน ทั้งการเรียนการสอน หลักสูตร และงานวิจัย',
        'คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ จึงมีแนวคิดจัดตั้ง"ศูนย์เทคโนโลยีและนวัตกรรมปัญญาประดิษฐ์เพื่อสุขภาพ (Artificial Intelligence Technology and Innovation Center for Health : AIIH)"ขึ้น โดยความร่วมมือกับวิทยาลัยแพทยศาสตร์พระมงกุฎเกล้าและโรงพยาบาลพระมงกุฎเกล้า เพื่อเป็นศูนย์ในการสร้างองค์ความรู้และพัฒนานวัตกรรมปัญญาประดิษฐ์ทางการแพทย์และสุขภาพ สามารถขับเคลื่อนนำผลงานวิจัยไปใช้ประโยชน์ในภาคอุตสาหกรรมและเชิงพาณิชย์ได้อย่างเป็นรูปธรรม เพิ่มศักยภาพการแข่งขันด้านเทคโนโลยีการแพทย์และสุขภาพของประเทศให้สูงขึ้น',
      ],
      image: 'img/about/about-img.jpg',
    },
    services: {
      title: 'ความเชี่ยวชาญของเรา',
      description:
        'AIIH ประกอบไปด้วยอาจารย์ แพทย์ และนักวิจัยที่มีความเชี่ยวชาญในหลายด้าน โดยสามารถแบ่งได้เป็น 5 หน่วยคือ',
      expertise: [
        {
          icon: 'fa-tachometer',
          title: 'High Performance Computing for Healthcare',
        },
        {
          icon: 'fa-eye',
          title: 'Medical Diagnostic Imaging',
          description: 'From medical images to healthcare practices',
        },
        {
          icon: 'fa-pie-chart',
          title: 'Data Science for Healthcare Informatics',
          description: 'From data to healthcare practices',
        },
        {
          icon: 'fa-language',
          title: 'Natural Language Processing for Healthcare',
        },
        {
          icon: 'fa-heartbeat',
          title: 'AI-Assisted Healthcare',
        },
      ],
    },
    portfolio: {
      title: 'ตัวอย่างงานวิจัยที่ดำเนินการ',
      description:
        'ทางศูนย์เทคโนโลยีและนวัตกรรมปัญญาประดิษฐ์เพื่อสุขภาพได้มีการทำวิจัยในหลายด้าน อาธิ',
      projects: [
        {
          image: 'img/portfolio/aiih-poster.png',
          title: 'Example Researches',
        },
      ],
    },
    clients: {
      title: 'ผู้ร่วมงานของเรา',
      partners: [
        {
          name: 'Phramongkutklao College of Medicine',
          logo: 'img/clients/client-1.png',
        },
        {
          name: 'Kasetsart University',
          logo: 'img/clients/client-2.png',
        },
      ],
    },
    callToAction: {
      title: 'สนใจทำงานกับเรา',
      description:
        'เพียงแค่สมัครสมาชิกคุณก็จะเป็นส่วนหนึ่งในการสร้างนวัตกรรมใหม่ๆ',
      buttonText: 'สมัครเลย',
    },
    team: {
      title: 'รู้จักกับทีมของ AIIH',
      members: [
        {
          name: 'Asst.Prof. Pakaket Wattuya, Ph.D.',
          image: 'img/team/team-1.jpg',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
        {
          name: 'Asst.Prof. Chakrit Watcharopas, Ph.D.',
          image: 'img/team/team-2.jpg',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
        {
          name: 'Thammakorn Saethang, Ph.D.',
          image: 'img/team/team-3.jpg',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
        {
          name: 'Nopadon Juneam, Ph.D.',
          image: 'img/team/team-4.jpeg',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
        {
          name: 'Soontharee Koompairojn, Ph.D.',
          image: 'img/team/team-5.jpeg',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
        {
          name: 'Asst.Prof. Aurawan Imsombut, Ph.D.',
          image: 'img/team/team-6.jpg',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
        {
          name: 'Pisut Wisessing, Ph.D.',
          image: 'img/team/team-7.png',
          social: ['twitter', 'facebook', 'google-plus', 'linkedin'],
        },
      ],
    },
    contact: {
      title: 'ติดต่อ AIIH',
      description:
        'Department of Computer Science, Faculty of Science, Kasetsart University (BangKhen Campus)',
      address: {
        icon: 'ion-ios-location-outline',
        text: 'SC45 7th floor and 8th floor 50, Ngamwongwan Rd., Khwaeng Lat Yao, Khet Chatuchak, Bangkok 10900',
      },
      phone: {
        icon: 'ion-ios-telephone-outline',
        text: '02-562-5555 ext. 647209, 647210',
      },
      email: {
        icon: 'ion-ios-email-outline',
        text: 'aiih.sci@ku.th',
      },
      map: {
        src: 'https://maps.google.com/?q=13.845790075224441,100.57133925459024&output=svembed',
      },
      form: {
        fields: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Your Name',
            rule: 'minlen:4',
          },
          {
            name: 'email',
            type: 'email',
            placeholder: 'Your Email',
            rule: 'email',
          },
          {
            name: 'subject',
            type: 'text',
            placeholder: 'Subject',
            rule: 'minlen:4',
          },
          {
            name: 'message',
            type: 'textarea',
            placeholder: 'Message',
            rows: 5,
            rule: 'required',
          },
        ],
        submitButton: 'Send Message',
      },
    },
  },
  footer: {
    copyright: 'Reveal. All Rights Reserved',
    designedBy: 'BootstrapMade',
  },
}

const iconMap: Record<string, React.ElementType | undefined> = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  'fa-tachometer': Activity,
  'fa-eye': Eye,
  'fa-pie-chart': BarChart,
  'fa-language': MessageSquare,
  'fa-heartbeat': Heart,
  'ion-ios-location-outline': MapPin,
  'ion-ios-telephone-outline': PhoneIcon,
  'ion-ios-email-outline': Mail,
}

function TopBar() {
  return (
    <div className="bg-slate-900 text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${websiteData.topBar.contactInfo.email}`}
            className="flex items-center gap-1 hover:text-slate-300"
          >
            <Mail size={14} />
            {websiteData.topBar.contactInfo.email}
          </a>
          <a
            href={`tel:${websiteData.topBar.contactInfo.phone}`}
            className="flex items-center gap-1 hover:text-slate-300"
          >
            <Phone size={14} />
            {websiteData.topBar.contactInfo.phone}
          </a>
        </div>
        <div className="flex gap-3">
          {websiteData.topBar.socialLinks.map((social) => {
            const Icon = iconMap[social]
            return Icon ? (
              <a
                key={social}
                href="#"
                className="hover:text-slate-300 transition-colors"
              >
                <Icon size={16} />
              </a>
            ) : null
          })}
        </div>
      </div>
    </div>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a
            href={websiteData.header.logo.href}
            className="text-2xl font-bold text-slate-800"
          >
            {websiteData.header.logo.text}
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {websiteData.header.navigation.map((item) => (
              <div key={item.text} className="relative group">
                <a
                  href={item.href || '#'}
                  className="flex items-center gap-1 text-slate-600 hover:text-aiih-primary transition-colors"
                >
                  {item.text}
                </a>
              </div>
            ))}
          </nav>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function Intro() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <section
      id="body"
      className="relative h-[600px] bg-aiih-primary overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Artificial Intelligence Technology and Innovation Center for Health
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            AIIH - ศูนย์เทคโนโลยีและนวัตกรรมปัญญาประดิษฐ์เพื่อสุขภาพ
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#about"
              className="bg-aiih-secondary hover:bg-aiih-secondary/80 text-aiih-primary px-6 py-3 rounded-full transition-colors font-semibold"
            >
              เรียนรู้เพิ่มเติม
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-aiih-primary text-white px-6 py-3 rounded-full transition-colors"
            >
              ติดต่อเรา
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
        {websiteData.intro.backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-colors',
              currentSlide === index ? 'bg-white' : 'bg-white/50',
            )}
          />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {websiteData.sections.about.title}
          </h2>
          <div className="w-20 h-1 bg-aiih-secondary mx-auto"></div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-12 md:items-start items-center">
          <AnimatedSection
            animation="fade-right"
            className="flex justify-center"
          >
            <img
              src={websiteData.sections.about.image}
              alt="About AIIH"
              className="h-auto max-h-[500px]"
            />
          </AnimatedSection>
          <AnimatedSection
            animation="fade-left"
            className="space-y-6 text-slate-600 leading-relaxed text-center md:text-left"
          >
            {websiteData.sections.about.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Activity
  }

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {websiteData.sections.services.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            {websiteData.sections.services.description}
          </p>
          <div className="w-20 h-1 bg-aiih-secondary mx-auto"></div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteData.sections.services.expertise.map((item, index) => {
            const Icon = getIcon(item.icon)
            return (
              <AnimatedSection
                key={index}
                animation="scale"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-aiih-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Icon size={28} className="text-aiih-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-slate-600">{item.description}</p>
                )}
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {websiteData.sections.portfolio.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            {websiteData.sections.portfolio.description}
          </p>
          <div className="w-20 h-1 bg-aiih-secondary mx-auto"></div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteData.sections.portfolio.projects.map((project, index) => (
            <AnimatedSection key={index} animation="scale">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative overflow-hidden rounded-lg cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90vw] w-fit sm:max-h-[90vh] p-0 bg-transparent border-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {websiteData.sections.clients.title}
          </h2>
          <div className="w-20 h-1 bg-aiih-secondary mx-auto"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {websiteData.sections.clients.partners.map((partner, index) => (
            <div key={index} className="text-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="size-60 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="py-20 bg-aiih-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {websiteData.sections.callToAction.title}
        </h2>
        <p className="text-aiih-secondary/80 max-w-2xl mx-auto mb-8 text-lg">
          {websiteData.sections.callToAction.description}
        </p>
        <button className="bg-aiih-secondary text-aiih-primary px-8 py-3 rounded-full font-semibold hover:bg-aiih-secondary/80 transition-colors">
          {websiteData.sections.callToAction.buttonText}
        </button>
      </div>
    </section>
  )
}

function Team() {
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Twitter
  }

  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {websiteData.sections.team.title}
          </h2>
          <div className="w-20 h-1 bg-aiih-secondary mx-auto"></div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {websiteData.sections.team.members.map((member, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square bg-slate-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                  {member.name}
                </h3>
                <div className="flex justify-center gap-3">
                  {member.social.map((social) => {
                    const Icon = getIcon(social)
                    return (
                      <a
                        key={social}
                        href="#"
                        className="text-slate-400 hover:text-aiih-secondary transition-colors"
                      >
                        <Icon size={18} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {websiteData.sections.contact.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            {websiteData.sections.contact.description}
          </p>
          <div className="w-20 h-1 bg-aiih-secondary mx-auto"></div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection animation="fade-left" className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-aiih-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-aiih-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
                <p className="text-slate-600">
                  {websiteData.sections.contact.address.text}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-aiih-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneIcon size={20} className="text-aiih-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
                <p className="text-slate-600">
                  {websiteData.sections.contact.phone.text}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-aiih-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-aiih-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                <p className="text-slate-600">
                  {websiteData.sections.contact.email.text}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={websiteData.sections.contact.map.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-right">
            <form className="space-y-4">
              {websiteData.sections.contact.form.fields.map((field) => (
                <div key={field.name}>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={field.rows}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aiih-secondary focus:border-transparent"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aiih-secondary focus:border-transparent"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-aiih-primary text-white py-3 rounded-lg font-semibold hover:bg-aiih-primary/80 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {websiteData.sections.contact.form.submitButton}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function RouteComponent() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <Intro />
      <About />
      <Services />
      <Portfolio />
      <Clients />
      <CallToAction />
      <Team />
      <Contact />
    </div>
  )
}
