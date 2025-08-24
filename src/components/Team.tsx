import React, { useState, useEffect, useCallback } from 'react';
import { Linkedin, Mail, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getImagePath, handleImageError } from '../utils/imageUtils';

// Define team member type
interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  social: {
    linkedin: string;
    email: string;
    github?: string;
    instagram?: string;
  };
}

type TeamCategory = keyof typeof teamCategories;

// Team categories
const teamCategories = {
  "Team Captain": "Team Captain",
  "Electronics & Software": "Electronics & Software Team",
  "Vehicle Dynamics": "Vehicle Dynamics Team",
  "Chassis & Ergonomics": "Chassis & Ergonomics Team",
  "Powertrain": "Powertrain Team",
  "Aerodynamics": "Aerodynamics Team",
  "Organization": "Organization Team",
  "Business Development": "Business Development",
} as const;

// Team member data
const teamMembers: TeamMember[] = [
  {
    name: 'Hüseyin Poyraz Kocamış',
    role: 'Team Captain',
    department: 'Civil Engineering',
    image: 'photos/POYRAZ.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/poyrazkocamis',
      email: 'poyraz@iztechracing.com',
    }
  },
  {
    name: "Serkan Doğan Evin",
    role: "Electronics & Software Team Leader",
    department: "Mechanical Engineering",
    image: "photos/SERKAN.png",
    social: {
      linkedin: "https://www.linkedin.com/in/serkan-do%C4%9Fan-evin-7569a61b8/",
      email: "serkan@iztechracing.com"
    }
  },
  {
    name: "Emre Canbaz",
    role: "Vehicle Dynamics Team Leader",
    department: "Mechanical Engineering",
    image: "photos/EMRE.png",
    social: {
      linkedin: "https://www.linkedin.com/in/emre-canbaz-30b087335",
      email: "emre@iztechracing.com",
      github: "#"
    }
  },
  {
    name: "Onur Şen",
    role: "Powertrain Team Leader",
    department: "Mechanical Engineering",
    image: "photos/ONUR.png",
    social: {
      linkedin: "https://www.linkedin.com/in/onur-sen-b87b50239",
      email: "onur@iztechracing.com"
    }
  },
  {
    name: "Efe Yıldırım",
    role: "Aerodynamics Team Leader",
    department: "Mechanical Engineering",
    image: "photos/EFEYILDIRIM.png",
    social: {
      linkedin: "https://www.linkedin.com/in/efeyldrm/",
      email: "efe@iztechracing.com",
      github: "#"
    }
  },
  {
    name: "Ödül Yarkın Baran",
    role: "Organization Team Leader",
    department: "Photonics Department",
    image: "photos/ÖdülYarkınBaran.png",
    social: {
      linkedin: "https://www.linkedin.com/in/odulyarkinbaran/",
      email: "odul@iztechracing.com",
      github: "#"
    }
  },
  {
    name: "Ahmet Duha Aydın",
    role: "Chassis & Ergonomics Team Leader",
    department: "Mechanical Engineering",
    image: "photos/DUHA.png",
    social: {
      linkedin: "https://www.linkedin.com/in/ahmet-duha-aydin-b81b98244",
      email: "duha@iztechracing.com",
      github: "#"
    }
  },
  {
    name: "Altay Alp",
    role: "Electronics & Software Team Member",
    department: "Electronics & Communication Engineering",
    image: "photos/ALTAYALP.png",
    social: {
      linkedin: "https://www.linkedin.com/in/altay-alp-4225bb251",
      email: "altay@iztechracing.com",
      github: "#"
    }
  },
  {
    name: "Arda Onuk",
    role: "Electronics & Software Team Member",
    department: "Mathematics Department",
    image: "photos/ARDAONUK.png",
    social: {
      linkedin: "https://www.linkedin.com/in/arda-onuk-8247b5352/",
      email: "arda@iztechracing.com",
      github: "#"
    }
  },
  {
    name: "Arda Akpolat",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: "photos/ARDAAKPOLAT.png",
    social: {
      linkedin: "https://www.linkedin.com/in/arda-akpolat-444a51315",
      email: "arda.akpolat@iztechracing.com"
    }
  },
  {
    name: "Arda Keskin",
    role: "Vehicle Dynamics Team Member",
    department: "Energy Systems Engineering",
    image: "photos/ARDAKESKİN.png",
    social: {
      linkedin: "https://www.linkedin.com/in/arda-keskin-ba7b36230",
      email: "arda.keskin@iztechracing.com"
    }
  },
  {
    name: "Batuhan Elmalıoğlu",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: "photos/BATU.png",
    social: {
      linkedin: "#",
      email: "batuhan@iztechracing.com"
    }
  },
  {
    name: "Berkant Süren",
    role: "Chassis & Ergonomics Team Member",
    department: "Materials Engineering",
    image: "photos/BERKANT.png",
    social: {
      linkedin: "https://www.linkedin.com/in/berkant-suren",
      email: "berkant@iztechracing.com"
    }
  },
  {
    name: "Defne",
    role: "Business Development Team Member",
    department: "Business Administration",
    image: "photos/DEFNE.png",
    social: {
      linkedin: "#",
      email: "defne@iztechracing.com"
    }
  },
  {
    name: "Ecem Nisa",
    role: "Business Development Team Member",
    department: "Business Administration",
    image: "photos/ECEMNİSA.png",
    social: {
      linkedin: "#",
      email: "ecem@iztechracing.com"
    }
  },
  {
    name: "Ediz",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: "photos/EDİZ.png",
    social: {
      linkedin: "#",
      email: "ediz@iztechracing.com"
    }
  },
  {
    name: "Efe Yıldırır",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: "photos/EFEYİLDİRİR.png",
    social: {
      linkedin: "#",
      email: "efe.yildirir@iztechracing.com"
    }
  },
  {
    name: "Emir Yaşa",
    role: "Electronics & Software Team Member",
    department: "Computer Engineering",
    image: "photos/EMİRYAŞA.png",
    social: {
      linkedin: "#",
      email: "emir@iztechracing.com"
    }
  },
  {
    name: "Eren Karasakal",
    role: "Business Development Team Member",
    department: "Business Administration",
    image: "photos/ERENKARASAKAL.png",
    social: {
      linkedin: "#",
      email: "eren@iztechracing.com"
    }
  },
  {
    name: "Eren Uş",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: "photos/ERENURUŞ.png",
    social: {
      linkedin: "#",
      email: "eren.us@iztechracing.com"
    }
  },
  {
    name: "Erol",
    role: "Business Development Team Member",
    department: "Business Administration",
    image: "photos/EROL.png",
    social: {
      linkedin: "#",
      email: "erol@iztechracing.com"
    }
  },
  {
    name: "Hakan",
    role: "Electronics & Software Team Member",
    department: "Electrical Engineering",
    image: "photos/HAKAN.png",
    social: {
      linkedin: "#",
      email: "hakan@iztechracing.com"
    }
  },
  {
    name: "Hatice",
    role: "Organization Team Member",
    department: "Industrial Engineering",
    image: "photos/HATİCE.png",
    social: {
      linkedin: "#",
      email: "hatice@iztechracing.com"
    }
  },
  {
    name: "Khayal Musayev",
    role: "Chassis & Ergonomics Team Member",
    department: "Mechanical Engineering",
    image: "photos/HAYAL.png",
    social: {
      linkedin: "#",
      email: "khayal@iztechracing.com"
    }
  },
  {
    name: "Kerem",
    role: "Powertrain Team Member",
    department: "Mechanical Engineering",
    image: "photos/KEREM.png",
    social: {
      linkedin: "#",
      email: "kerem@iztechracing.com"
    }
  },
  {
    name: "Mert Kaan",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: "photos/MERTKAAN.png",
    social: {
      linkedin: "#",
      email: "mert@iztechracing.com"
    }
  },
  {
    name: "Senanur Günay",
    role: "Organization Team Member",
    department: "Computer Engineering",
    image: "photos/SENANUR.png",
    social: {
      linkedin: "#",
      email: "senanur@iztechracing.com"
    }
  },
  {
    name: "Sinan Efe",
    role: "Electronics & Software Team Member",
    department: "Electrical Engineering",
    image: "photos/SİNANEFE.png",
    social: {
      linkedin: "#",
      email: "sinan@iztechracing.com"
    }
  },
  {
    name: "Tarık Alperen Öcal",
    role: "Vehicle Dynamics Team Member",
    department: "Mechanical Engineering",
    image: "photos/TARIKALPERENOCAL.png",
    social: {
      linkedin: "#",
      email: "tarik@iztechracing.com"
    }
  },
  {
    name: "Tuna Kurbanoğlu",
    role: "Business Development Team Member",
    department: "Business Administration",
    image: "photos/TUNAKURBAN.png",
    social: {
      linkedin: "#",
      email: "tuna@iztechracing.com"
    }
  },
  {
    name: "Tunay",
    role: "Electronics & Software Team Member",
    department: "Computer Engineering",
    image: "photos/TUNAY.png",
    social: {
      linkedin: "#",
      email: "tunay@iztechracing.com"
    }
  },
  {
    name: "Tuğçe",
    role: "Organization Team Member",
    department: "Industrial Engineering",
    image: "photos/TUĞÇE.png",
    social: {
      linkedin: "#",
      email: "tugce@iztechracing.com"
    }
  },
  {
    name: "Yağız Yalçın",
    role: "Aerodynamics Team Member",
    department: "Mechanical Engineering",
    image: "photos/YAĞIZYALÇIN.png",
    social: {
      linkedin: "#",
      email: "yagiz@iztechracing.com"
    }
  }
];

// Image preloading function
const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = getImagePath(src);
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Failed to preload image:', src, error);
      reject(error);
    };
  });
};

// Categorize team members by their role
const categorizeTeamMembers = (members: TeamMember[]): Record<string, TeamMember[]> => {
  const categories: Record<string, TeamMember[]> = {};
  
  members.forEach((member) => {
    const category = Object.keys(teamCategories).find(key => 
      member.role.includes(key)
    ) as TeamCategory || 'Other';
    
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(member);
  });
  
  return categories;
};

// Team Member Card Component
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative pt-[100%] bg-gray-800">
        <img 
          src={getImagePath(member.image)} 
          alt={member.name} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        )}
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
          {member.social.github && (
            <a 
              href={member.social.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors" 
              aria-label={`${member.name} GitHub`}
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Team Component
const Team: React.FC = () => {
  const { t } = useTranslation();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [categorizedMembers, setCategorizedMembers] = useState<Record<string, TeamMember[]>>({});

  // Preload images when component mounts
  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(teamMembers.map(member => preloadImage(member.image)));
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Continue even if some images fail to load
      }
    };

    loadImages();
  }, []);

  // Categorize team members when component mounts
  useEffect(() => {
    setCategorizedMembers(categorizeTeamMembers(teamMembers));
  }, []);

  // Render loading state
  if (!imagesLoaded) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse text-gray-400">Loading team members...</div>
        </div>
      </section>
    );
  }

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
