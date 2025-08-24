import React, { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Define team member type
interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  social: {
    linkedin: string;
    email: string;
    instagram?: string;
  };
}

type TeamCategory = keyof typeof teamCategories;

// Team categories with proper hierarchy
const teamCategories = {
  "leadership": "Leadership",
  "vehicle-dynamics": "Vehicle Dynamics",
  "electronics": "Electronics & Software",
  "aerodynamics": "Aerodynamics",
  "powertrain": "Powertrain",
  "chassis": "Chassis & Ergonomics",
  "business": "Business & Marketing",
  "organization": "Organization"
} as const;

// Helper function to create image path
const getImagePath = (filename: string): string => {
  // For Netlify, ensure the path is relative to the public directory
  if (filename.startsWith('http')) return filename;
  // Remove Turkish characters and convert to lowercase for consistency
  const normalized = filename
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase();
  return `/${normalized}`;
};

// Team member data
const teamMembers: TeamMember[] = [
  // Leadership
  {
    name: "Hüseyin Poyraz Kocamış",
    role: "Team Captain",
    department: "Civil Engineering",
    image: getImagePath("POYRAZ.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/poyrazkocamis?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "poyraz@iztechracing.com"
    }
  },
  {
    name: "Serkan Doğan Evin",
    role: "Electronics & Software Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("SERKAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/serkan-do%C4%9Fan-evin-7569a61b8/",
      email: "serkan@iztechracing.com",
      instagram: "#"
    }
  },
  {
    name: "Emre Canbaz",
    role: "Vehicle Dynamics Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("EMRE.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/emre-canbaz-30b087335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "emre@iztechracing.com"
    }
  },
  {
    name: "Onur Şen",
    role: "Powertrain Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("ONUR.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/onur-%C5%9Fen-b87b50239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "onur@iztechracing.com"
    }
  },
  {
    name: "Efe Yıldırım",
    role: "Aerodynamics Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("EFEYILDIRIM.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/efeyldrm/",
      email: "efe@iztechracing.com"
    }
  },
  {
    name: "Ödül Yarkın Baran",
    role: "Organization Team Leader",
    department: "Photonics Department",
    image: getImagePath("ODULYARKIN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/odulyarkinbaran/",
      email: "odul@iztechracing.com"
    }
  },
  {
    name: "Ahmet Duha Aydın",
    role: "Chassis & Ergonomics Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("DUHA.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/ahmet-duha-aydin-b81b98244",
      email: "duha@iztechracing.com"
    }
  },
  {
    name: "Altay Alp",
    role: "Electronics & Software Team Member",
    department: "Electronics & Communication Engineering",
    image: getImagePath("ALTAYALP.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/altay-alp-4225bb251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "altay@iztechracing.com"
    }
  },
  {
    name: "Arda Onuk",
    role: "Electronics & Software Team Member",
    department: "Mathematics Department",
    image: getImagePath("ARDAONUK.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-onuk-8247b5352/",
      email: "ardaonuk9995@gmail.com"
    }
  },
  {
    name: "Berkant Süren",
    role: "Chassis & Ergonomics Team Member",
    department: "Materials Engineering",
    image: getImagePath("BERKANT.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/berkant-suren?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "berkant@iztechracing.com"
    }
  },
  {
    name: "Arda Keskin",
    role: "Vehicle Dynamics Team Member",
    department: "Energy Systems Engineering",
    image: getImagePath("ARDAKESKIN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-keskin-ba7b36230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "arda@iztechracing.com"
    }
  },
  {
    name: "Arda Akpolat",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ARDAAKPOLAT.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-akpolat-444a51315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "arda.akpolat@iztechracing.com"
    }
  },
  {
    name: "Senanur Günay",
    role: "Electronics & Software Team Member",
    department: "Computer Engineering",
    image: getImagePath("SENANUR.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/senanur-g%C3%BCnay-94172431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "senanur@iztechracing.com"
    }
  },
  {
    name: "Beren Alptekin",
    role: "Organization Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("INSAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/beren-alptekin-71b6a5343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "beren@iztechracing.com"
    }
  },
  {
    name: "Tarık Alperen Öcal",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("TARIKALPERENOCAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tar%C4%B1k-alperen-%C3%B6cal-32b8722b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "tarik@iztechracing.com"
    }
  },
  {
    name: "Yağız Yalçın",
    role: "Powertrain Team Member",
    department: "Energy Systems Engineering",
    image: getImagePath("YAGIZYALCIN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/yagizyalcin00?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "yagiz@iztechracing.com"
    }
  },
  {
    name: "Batuhan Elmaoğlu",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("BATU.png"),
    social: {
      linkedin: "http://www.linkedin.com/in/batuhan-elmao%C4%9Flu-338185296",
      email: "batuhan@iztechracing.com"
    }
  },
  {
    name: "Eren Uruş",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ERENURUS.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/erenurus",
      email: "eren.urus@iztechracing.com"
    }
  },
  {
    name: "Eren Karasakal",
    role: "Chassis & Ergonomics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ERENKARASAKAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/eren-karasakal-406769342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "eren.karasakal@iztechracing.com"
    }
  },
  {
    name: "Tuğçe Özcan",
    role: "Chassis & Ergonomics Team Member",
    department: "Materials Engineering",
    image: getImagePath("TUGCE.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tu%C4%9F%C3%A7e-%C3%B6zcan-19738133b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "tugce@iztechracing.com"
    }
  },
  {
    name: "Nevzat Ediz Burçoğlu",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("EDIZ.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/nevzatedizburcoglu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "ediz@iztechracing.com"
    }
  },
  {
    name: "Kerem Katrancı",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("KEREM.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/kerem-katranc%C4%B1-33294a247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "kerem@iztechracing.com"
    }
  },
  {
    name: "Emir Yaşa",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("EMIRYASA.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/emir-ya%C5%9Fa-344460343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "emir@iztechracing.com"
    }
  },
  {
    name: "Tuna Kurban",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("TUNAKURBAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tuna-kurban-147606286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "tuna@iztechracing.com"
    }
  },
  {
    name: "Hakan Şendaldal",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("HAKAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/hakan-%C5%9Fendaldal-9b9688251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "hakan@iztechracing.com"
    }
  },
  {
    name: "Khayal Musayev",
    role: "Chassis & Ergonomics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("KHAYAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/khayal-musayev-98b769343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "khayal@iztechracing.com"
    }
  },
  {
    name: "Sinan Efe Bayrak",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("SINANEFE.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/sinan-efe-bayrak-578419331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "sinan@iztechracing.com"
    }
  },
  {
    name: "Kuzey Demirer",
    role: "Business Development Team Leader",
    department: "Industrial Design",
    image: getImagePath("KUZEY.png"),
    social: {
      linkedin: "https://tr.linkedin.com/in/kuzey-demirer-76577a260",
      email: "kuzey@iztechracing.com"
    }
  },
  {
    name: "Emre Canbaz",
    role: "Vehicle Dynamics Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("EMRE.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/emre-canbaz-30b087335",
      email: "emre@iztechracing.com"
    }
  },
  {
    name: "Onur Şen",
    role: "Powertrain Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("ONUR.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/onur-sen-b87b50239",
      email: "onur@iztechracing.com"
    }
  },
  {
    name: "Efe Yıldırım",
    role: "Aerodynamics Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("EFEYILDIRIM.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/efeyldrm/",
      email: "efe@iztechracing.com"
    }
  },
  {
    name: "Ödül Yarkın Baran",
    role: "Organization Team Leader",
    department: "Industrial Engineering",
    image: getImagePath("ODUL.png"),
    social: {
      linkedin: "#",
      email: "odul@iztechracing.com"
    },
  },
  {
    name: "Kuzey Demirer",
    role: "Business Development Team Leader",
    department: "Industrial Design",
    image: getImagePath("KUZEY.png"),
    social: {
      linkedin: "#",
      email: "kuzey@iztechracing.com"
    },
  },
  
  // Vehicle Dynamics Team
  {
    name: "Arda Akpolat",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ARDAKAPOLAT.png"),
    social: {
      linkedin: "#",
      email: "arda.akpolat@iztechracing.com"
    }
  },
  {
    name: "Arda Onuk",
    role: "Electronics & Software Team Member",
    department: "Mathematics Department",
    image: getImagePath("ARDAONUK.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-onuk-8247b5352/",
      email: "ardaonuk9995@gmail.com"
    }
  },
  
  // Aerodynamics Team
  {
    name: "Alp Altan Sönmez",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("YAGIZYALCIN.png"),
    social: {
      linkedin: "#",
      email: "alp@iztechracing.com"
    }
  },
  
  // Powertrain Team
  {
    name: "Tarık Alperen Öcal",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("TARIKALPERENOCAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tar%C4%B1k-alperen-%C3%B6cal-32b8722b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "tarik@iztechracing.com"
    }
  },
  
  // Business & Marketing
  {
    name: "Ayşe Nur Çelik",
    role: "Business Development",
    department: "Business Administration",
    image: getImagePath("AYSE.png"),
    social: {
      linkedin: "#",
      email: "ayse@iztechracing.com"
    }
  },
  {
    name: "Ödül Yarkın Baran",
    role: "Organization Team Leader",
    department: "Industrial Engineering",
    image: getImagePath("ODUL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/odulyarkinbaran/",
      email: "odul@iztechracing.com"
    }
  },
  {
    name: "Ahmet Duha Aydın",
    role: "Chassis & Ergonomics Team Leader",
    department: "Mechanical Engineering",
    image: getImagePath("DUHA.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/ahmet-duha-aydin-b81b98244",
      email: "duha@iztechracing.com"
    }
  },
  {
    name: "Altay Alp",
    role: "Electronics & Software Team Member",
    department: "Electronics & Communication Engineering",
    image: getImagePath("ALTAYALP.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/altay-alp-4225bb251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Arda Onuk",
    role: "Electronics & Software Team Member",
    department: "Mathematics Department",
    image: getImagePath("ARDAONUK.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-onuk-8247b5352/",
      email: "ardaonuk9995@gmail.com",
    }
  },
  {
    name: "Berkant Süren",
    role: "Chassis & Ergonomics Team Member",
    department: "Materials  Engineering",
    image: getImagePath("BERKANT.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/berkant-suren?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Arda Keskin",
    role: "Vehicle Dynamics Team Member",
    department: "Energy Systems  Engineering",
    image: getImagePath("ARDAKESKIN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-keskin-ba7b36230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Arda Akpolat",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ARDAAKPOLAT.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/arda-akpolat-444a51315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Senanur Günay",
    role: "Electronics & Software Team Member",
    department: "Computer Engineering",
    image: getImagePath("SENANUR.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/senanur-g%C3%BCnay-94172431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Beren Alptekin",
    role: "Organization Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("INSAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/beren-alptekin-71b6a5343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Tarık Alperen Öcal",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("TARIKALPERENOCAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tar%C4%B1k-alperen-%C3%B6cal-32b8722b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Yağız Yalçın",
    role: "Powertrain Team Member",
    department: "Energy Systems Engineering",
    image: getImagePath("YAGIZYALCIN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/yagizyalcin00?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "alex@iztechracing.com",
    }
  },
  {
    name: "Batuhan Elmaoğlu",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("BATU.png"),
    social: {
      linkedin: "http://www.linkedin.com/in/batuhan-elmaoğlu-338185296",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Eren Uruş",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ERENURUS.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/erenurus",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Eren Karasakal",
    role: "Chassis & Ergonomics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("ERENKARASAKAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/eren-karasakal-406769342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Tuğçe Özcan",
    role: "Chassis & Ergonomics Team Member",
    department: "Materials Engineering",
    image: getImagePath("TUGCE.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tu%C4%9F%C3%A7e-%C3%B6zcan-19738133b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Nevzat Ediz Burçoğlu",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("EDIZ.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/nevzatedizburcoglu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Kerem Katrancı",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("KEREM.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/kerem-katranc%C4%B1-33294a247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Emir Yaşa",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("EMIRYASA.png"),
    social: {
      linkedin: " https://www.linkedin.com/in/emir-ya%C5%9Fa-344460343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app,",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Tuna Kurban",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("TUNAKURBAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/tuna-kurban-147606286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Hakan Şendaldal",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("HAKAN.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/hakan-%C5%9Fendaldal-9b9688251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Khayal Musayev",
    role: "Chassis & Ergonomics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("KHAYAL.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/khayal-musayev-98b769343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Sinan Efe Bayrak",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: getImagePath("SINANEFE.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/sinan-efe-bayrak-578419331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "@iztechracing.com",
    }
  },
  {
    name: "Kuzey Demirer",
    role: "Business Development",
    department: "Industrial Design",
    image: getImagePath("INSAN.png"),
    social: {
      linkedin: "https://tr.linkedin.com/in/kuzey-demirer-76577a260",
      email: "@iztechracing.com",
    }
  }
];


// Enhanced team categorization with better role mapping
const categorizeTeamMembers = (members: TeamMember[]): Record<string, TeamMember[]> => {
  const categories: Record<string, TeamMember[]> = {};
  
  // Initialize all categories
  Object.values(teamCategories).forEach(category => {
    categories[category] = [];
  });

  // Map roles to categories with more specific matching
  const roleToCategory: Record<string, string> = {
    // Leadership
    'captain': teamCategories.leadership,
    'team lead': teamCategories.leadership,
    'leader': teamCategories.leadership,
    
    // Electronics & Software
    'electronic': teamCategories.electronics,
    'software': teamCategories.electronics,
    'computer': teamCategories.electronics,
    
    // Vehicle Dynamics
    'vehicle': teamCategories['vehicle-dynamics'],
    'dynamics': teamCategories['vehicle-dynamics'],
    'suspension': teamCategories['vehicle-dynamics'],
    
    // Aerodynamics
    'aero': teamCategories.aerodynamics,
    'aerodynamics': teamCategories.aerodynamics,
    
    // Powertrain
    'powertrain': teamCategories.powertrain,
    'engine': teamCategories.powertrain,
    'transmission': teamCategories.powertrain,
    
    // Chassis & Ergonomics
    'chassis': teamCategories.chassis,
    'ergonomic': teamCategories.chassis,
    'ergonomics': teamCategories.chassis,
    'composite': teamCategories.chassis,
    
    // Business & Marketing
    'business': teamCategories.business,
    'marketing': teamCategories.business,
    'sponsor': teamCategories.business,
    
    // Organization
    'organization': teamCategories.organization,
    'logistics': teamCategories.organization,
    'support': teamCategories.organization
  };

  members.forEach(member => {
    const role = member.role.toLowerCase();
    let category = '';
    
    // First check for exact matches in role
    for (const [key, value] of Object.entries(roleToCategory)) {
      if (new RegExp(`\\b${key}\\b`, 'i').test(role)) {
        category = value;
        break;
      }
    }
    
    // If no exact match found, try partial match
    if (!category) {
      for (const [key, value] of Object.entries(roleToCategory)) {
        if (role.includes(key)) {
          category = value;
          break;
        }
      }
    }
    
    // Default to organization if still no category found
    if (!category) {
      category = teamCategories.organization;
    }
    
    if (!categories[category]) {
      categories[category] = [];
    }
    
    // Find the right position to insert (leaders first, then alphabetically by name)
    const isLeader = role.includes('leader') || role.includes('captain') || role.includes('head');
    
    if (isLeader) {
      // Insert leaders at the beginning
      categories[category].unshift(member);
    } else {
      // For non-leaders, find the right alphabetical position
      const insertIndex = categories[category].findIndex(m => 
        !m.role.toLowerCase().includes('leader') && 
        !m.role.toLowerCase().includes('captain') && 
        !m.role.toLowerCase().includes('head') &&
        m.name.localeCompare(member.name) > 0
      );
      
      if (insertIndex === -1) {
        categories[category].push(member);
      } else {
        categories[category].splice(insertIndex, 0, member);
      }
    }
  });
  
  // Ensure each category is properly sorted
  Object.keys(categories).forEach(key => {
    categories[key].sort((a, b) => {
      const aIsLeader = a.role.toLowerCase().includes('lead') || 
                       a.role.toLowerCase().includes('captain') ||
                       a.role.toLowerCase().includes('head');
      const bIsLeader = b.role.toLowerCase().includes('lead') || 
                       b.role.toLowerCase().includes('captain') ||
                       b.role.toLowerCase().includes('head');
      
      // Leaders come first
      if (aIsLeader && !bIsLeader) return -1;
      if (!aIsLeader && bIsLeader) return 1;
      
      // If both are leaders or both are not, sort by name
      return a.name.localeCompare(b.name);
    });
  });

  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });
  
  return categories;
};

// Team Member Card Component
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = './placeholder-avatar.png';
  };

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative pt-[100%] bg-gray-800">
        <img 
          src={member.image.startsWith('http') ? member.image : `/${member.image}`}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleImageError}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{member.name}</h3>
        <p className="text-gray-300">{member.role}</p>
        <p className="text-sm text-gray-400 mb-3">{member.department}</p>
        <div className="flex space-x-4">
          <a 
            href={member.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors" 
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin size={20} />
          </a>
          <a 
            href={`mailto:${member.social.email}`} 
            className="text-gray-400 hover:text-white transition-colors" 
            aria-label={`Email ${member.name}`}
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

// Main Team Component
const Team: React.FC = () => {
  const { t } = useTranslation();
  const [categorizedMembers] = useState<Record<string, TeamMember[]>>(
    () => categorizeTeamMembers(teamMembers)
  );



  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">{t('our_team', 'Our Team')}</h1>
      
      {Object.entries(categorizedMembers).map(([category, members]) => (
        <div key={category} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {teamCategories[category as TeamCategory] || category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <TeamMemberCard key={`${member.name}-${index}`} member={member} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Team;
