export interface CollegeOrUniversity {
  "@type": "CollegeOrUniversity";
  name: string;
  sameAs: string;
}

/**
 * Schema.org type for Person
 *
 * This is a simplified version of the schema.org Person type.
 * It includes only the properties that are relevant for this application.
 *
 * @see https://schema.org/Person
 */
export interface PrivateDetails {
  "@context": "http://schema.org";
  "@type": "Person";
  "@id": string;
  givenName: string;
  familyName: string;
  additionalName: string;
  gender: string;
  birthPlace: string;
  nationality: string;
  alumniOf: CollegeOrUniversity[];
  jobTitle: string;
  skills: string;
  image: string;
  url: string;
  sameAs: string[];
}

export interface JsonLdHtml {
  __html: string;
}
