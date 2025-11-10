import type { SanityImageSource } from '@sanity/image-url'
import { groq } from 'next-sanity'

export interface NavigationItem {
  label: string
  href: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface SocialLink {
  label?: string
  href?: string
}

export interface SiteSettings {
  title?: string
  logo?: SanityImageSource
  navigation?: NavigationItem[]
  contactCtaLabel?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  footerLinks?: FooterLink[]
  socialLinks?: SocialLink[]
}

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  logo,
  navigation,
  contactCtaLabel,
  contactEmail,
  contactPhone,
  address,
  footerLinks,
  socialLinks
}`

export interface PracticeAreaSummary {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageSource
  summary?: string
}

export interface LawyerSummary {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: SanityImageSource
}

export interface PostSummary {
  _id: string
  title: string
  slug: string
  summary?: string
  mainImage?: SanityImageSource
  publishedAt?: string
}

export interface HomePagePayload {
  home?: {
    heroTitle?: string
    heroSubtitle?: string
    heroCtaLabel?: string
    heroCtaLink?: string
    heroImage?: SanityImageSource
    practiceAreasTitle?: string
    practiceAreasDescription?: string
    featuredPracticeAreas?: PracticeAreaSummary[]
    teamSectionTitle?: string
    teamSectionDescription?: string
    featuredLawyers?: LawyerSummary[]
    newsSectionTitle?: string
    newsSectionDescription?: string
    featuredPosts?: PostSummary[]
  }
  allPracticeAreas?: PracticeAreaSummary[]
  latestPosts?: PostSummary[]
  allLawyers?: LawyerSummary[]
}

export const homePageQuery = groq`{
  "home": *[_type == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    heroCtaLabel,
    heroCtaLink,
    heroImage,
    practiceAreasTitle,
    practiceAreasDescription,
    featuredPracticeAreas[]->{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      summary
    },
    teamSectionTitle,
    teamSectionDescription,
    featuredLawyers[]->{
      _id,
      name,
      position,
      profileImage,
      "slug": slug.current
    },
    newsSectionTitle,
    newsSectionDescription,
    featuredPosts[]->{
      _id,
      title,
      summary,
      mainImage,
      publishedAt,
      "slug": slug.current
    }
  },
  "allPracticeAreas": *[_type == "areaDePractica"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    mainImage,
    summary
  },
  "latestPosts": *[_type == "post"] | order(publishedAt desc)[0..2]{
    _id,
    title,
    summary,
    mainImage,
    publishedAt,
    "slug": slug.current
  },
  "allLawyers": *[_type == "abogado"] | order(name asc){
    _id,
    name,
    position,
    profileImage,
    "slug": slug.current
  }
}`

export interface ContactPagePayload {
  title?: string
  subtitle?: string
  formTitle?: string
  formDisclaimer?: string
  formCtaLabel?: string
  formDisabled?: boolean
  email?: string
  phone?: string
  address?: string
  schedule?: string[]
  mapEmbed?: string
}

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  title,
  subtitle,
  formTitle,
  formDisclaimer,
  formCtaLabel,
  formDisabled,
  email,
  phone,
  address,
  schedule,
  mapEmbed
}`
