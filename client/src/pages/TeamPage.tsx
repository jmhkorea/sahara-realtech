import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  department: 'executive' | 'technical' | 'directors' | 'advisors';
}

export default function TeamPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Team members data from the provided file
  const teamMembers: TeamMember[] = [
    // Executive Leadership
    {
      id: 1,
      name: 'Han Ko, D.Sc.',
      title: 'Co-Founder & CEO',
      bio: 'Expertise: CTO/CEO, Software Development Management, VC, Investor, Global Marketing, Community Leader, Professor. CEO of USAKO Group, Current CTO in a Blockchain Development firm, Professor at Midwest University in U.S.',
      imageUrl: '/assets/team/team-1.jpg',
      linkedin: 'https://linkedin.com/in/hanko',
      department: 'executive'
    },
    {
      id: 2,
      name: 'Brian Jung',
      title: 'Co-Founder/CEO & CTO',
      bio: 'Computer Science Expert specializing in blockchain architecture development and DevOps. Education: Seoul National University GLP MBA, Dongguk University Fintech MBA. Expertise in Blockchain & Smart Contracts, Dapps Programming.',
      imageUrl: '/assets/team/team-2.jpg',
      linkedin: 'https://linkedin.com/in/brianjung',
      department: 'executive'
    },
    {
      id: 3,
      name: 'Barbara Bickham',
      title: 'CTO',
      bio: 'Global Technical Engineer, CEO of Trailyn Ventures, LLC. Expertise: NFT, Blockchain, Investment, Tech Scale-up. Computer Science & MBA from University of California, Berkeley. Award-winning CTO & VC.',
      imageUrl: '/assets/team/team-3.jpg',
      linkedin: 'https://linkedin.com/in/barbarabickham',
      twitter: 'https://twitter.com/barbarabickham',
      department: 'executive'
    },
    
    // Technical Leadership
    {
      id: 4,
      name: 'Se Youl Park',
      title: 'Technical Lead',
      bio: 'Former IBM KOREA Director, Executive Information Technology Architect. Blockchain Technical Lead and CLT at IBM. Selected as "Technical Leader at IBM" by media in 2022.',
      imageUrl: '/assets/team/team-4.jpg',
      linkedin: 'https://linkedin.com/in/seyoulpark',
      department: 'technical'
    },
    {
      id: 5,
      name: 'Yeom Ki Ho',
      title: 'CTO',
      bio: 'CEO of Keystone Lab & KDEX Cryptocurrency Exchange. Author of Hanbit Academy Java Programming Bible (Bestseller). Metaverse, NFT, blockchain expert and programming lecturer.',
      imageUrl: '/assets/team/team-5.jpg',
      github: 'https://github.com/yeomkiho',
      department: 'technical'
    },
    {
      id: 6,
      name: 'Kim Hyun Chang',
      title: 'CTO',
      bio: 'Director of Pets DNA Labs, Current CEO at Pet & Cats Bio Ltd. Previous experience at IBM Korea, Softbank Korea, and POSTECH Special Engineer.',
      imageUrl: '/assets/team/team-6.jpg',
      linkedin: 'https://linkedin.com/in/hyunchangkim',
      department: 'technical'
    },
    
    // Directors
    {
      id: 7,
      name: 'Tom Ray, JD',
      title: 'Executive Director',
      bio: 'C-Suite Commercial Real Estate professional with Juris Doctorate. Award-Winning Power Broker with REIT experience. Senior VP at CBRE (World\'s largest commercial real estate company).',
      imageUrl: '/assets/team/team-7.jpg',
      linkedin: 'https://linkedin.com/in/tomray',
      department: 'directors'
    },
    {
      id: 8,
      name: 'Collin Knock',
      title: 'Executive Director',
      bio: 'Expertise: RE Lending, Financing, Blockchain. Founded and operated one of top 100 financing companies in USA. Experience in multiple successful tech and financing ventures.',
      imageUrl: '/assets/team/team-8.jpg',
      linkedin: 'https://linkedin.com/in/collinknock',
      department: 'directors'
    },
    {
      id: 9,
      name: 'Dr. GT Wu, Ph.D & J.D',
      title: 'Executive Director',
      bio: 'Expertise: Investment, Legal & High Tech. Education: Ph.D. from Cornell University, M.S. from Stanford University, B.S. from University of California, Berkeley, J.D. from Fordham University.',
      imageUrl: '/assets/team/team-9.jpg',
      linkedin: 'https://linkedin.com/in/gtwu',
      department: 'directors'
    },
    {
      id: 10,
      name: 'Frank Pica',
      title: 'Executive Director',
      bio: 'Specializes in Fund Raising and Product Development. Expertise in AI Product and Blockchain for C-Suite Companies. Founding Member and VP of LockerDome (US) and Adyoulike (Europe).',
      imageUrl: '/assets/team/team-10.jpg',
      linkedin: 'https://linkedin.com/in/frankpica',
      department: 'directors'
    },
    {
      id: 11,
      name: 'Yong Hyoung',
      title: 'Executive Director',
      bio: 'Tech Scale-up and Startup specialist. Founder of "Cyworld" (quoted as "the person who inspired Facebook"). Proven Leader in Asia. Education: Korea Advanced Institute of Science and Technology (KAIST).',
      imageUrl: '/assets/team/team-11.jpg',
      linkedin: 'https://linkedin.com/in/yonghyoung',
      department: 'directors'
    },
    {
      id: 12,
      name: 'Dr. Eunice Ko, MD',
      title: 'Executive Director',
      bio: 'Medical Doctor. Expertise: Real Estate and Blockchain Tech Investment, Fund Raising and Management, Medical and Bio Tech.',
      imageUrl: '/assets/team/team-12.jpg',
      linkedin: 'https://linkedin.com/in/euniceko',
      department: 'directors'
    },
    {
      id: 13,
      name: 'Jae Kim',
      title: 'Executive Director',
      bio: 'Finance, Accounting, Risk Analysis specialist. Chamber of commerce in U.S. Expertise: Fund Raise & Investment, Private company Finance & Risk Analysis, U.S. Bank, Credit & Risk Analysis.',
      imageUrl: '/assets/team/team-13.jpg',
      linkedin: 'https://linkedin.com/in/jaekim',
      department: 'directors'
    },
    {
      id: 14,
      name: 'David Shim',
      title: 'Executive Director',
      bio: 'Software Development Engineering at a boutique consulting firm in Denver, Colorado. Experience in software development for multinational companies including Amazon. Education: Accounting and Business degree from University of Illinois, Urbana-Champaign.',
      imageUrl: '/assets/team/team-14.jpg',
      github: 'https://github.com/davidshim',
      department: 'directors'
    },
    
    // Advisors
    {
      id: 15,
      name: 'In Soo Kim',
      title: 'Advisor',
      bio: 'MBA, Seoul National University. Former CEO of Samjong KPMG Consulting. Former Vice President, Samjong KPMG.',
      imageUrl: '/assets/team/team-15.jpg',
      linkedin: 'https://linkedin.com/in/insookim',
      department: 'advisors'
    },
    {
      id: 16,
      name: 'Yoon Jae Hwan',
      title: 'Advisor',
      bio: 'Chairman of Ocean Star Sahara Resort. President of Korea Railroad Newspaper. President of Bichaena World Movement Headquarters. President of Business Incubation Center.',
      imageUrl: '/assets/team/team-16.jpg',
      linkedin: 'https://linkedin.com/in/yoonjaehwan',
      department: 'advisors'
    },
    {
      id: 17,
      name: 'Hyug-soon Kwon',
      title: 'Advisor',
      bio: 'Former Head of Fintech Center, KB Kookmin Bank. TECHNO MBA from KAIST University.',
      imageUrl: '/assets/team/team-17.jpg',
      linkedin: 'https://linkedin.com/in/hyugsoonkwon',
      department: 'advisors'
    },
    {
      id: 18,
      name: 'Won-bu Lee',
      title: 'Advisor',
      bio: 'Dean and Professor at Dongguk University Business School. Professor of Artificial Intelligence, Fintech, and Blockchain.',
      imageUrl: '/assets/team/team-18.jpg',
      linkedin: 'https://linkedin.com/in/wonbulee',
      department: 'advisors'
    },
    {
      id: 19,
      name: 'Perry Chappell',
      title: 'Advisor',
      bio: 'Successful startup founder and strategist for Exits and M&As. 40 Years of experience focusing on Consumer Markets and Startup Strategies. Multiple Exits and M&As including Genesis Microchip, VIXS, Genesis Paradise Electronics. Current CEO and Co-founder of Zing Communications Inc.',
      imageUrl: '/assets/team/team-19.jpg',
      linkedin: 'https://linkedin.com/in/perrychappell',
      department: 'advisors'
    }
  ];

  // 현재 언어에 맞게 표시 (실제 모든 언어는 영어로 통일하였으므로 단순화)
  const getLocalizedName = (member: TeamMember) => {
    return member.name;
  };

  const getLocalizedTitle = (member: TeamMember) => {
    return member.title;
  };

  const getLocalizedBio = (member: TeamMember) => {
    return member.bio;
  };

  // 활성 탭에 따라 필터링된 팀 멤버 목록
  const filteredMembers = activeTab === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeTab);

  return (
    <div className="bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('team.title')}</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('team.subtitle')}</p>
        </div>

        <Tabs defaultValue="all" className="mb-10" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white border">
              <TabsTrigger value="all">{t('team.filters.all')}</TabsTrigger>
              <TabsTrigger value="executive">{t('team.filters.executive')}</TabsTrigger>
              <TabsTrigger value="technical">{t('team.filters.technical')}</TabsTrigger>
              <TabsTrigger value="directors">{t('team.filters.directors')}</TabsTrigger>
              <TabsTrigger value="advisors">{t('team.filters.advisors')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={getLocalizedName(member)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{getLocalizedName(member)}</h3>
                    <p className="text-primary font-medium mb-3">{getLocalizedTitle(member)}</p>
                    <p className="text-neutral-600 text-sm mb-4">{getLocalizedBio(member)}</p>
                    <div className="flex space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-600" aria-label="LinkedIn">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-400" aria-label="Twitter">
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-800" aria-label="GitHub">
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="executive" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={getLocalizedName(member)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{getLocalizedName(member)}</h3>
                    <p className="text-primary font-medium mb-3">{getLocalizedTitle(member)}</p>
                    <p className="text-neutral-600 text-sm mb-4">{getLocalizedBio(member)}</p>
                    <div className="flex space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-600" aria-label="LinkedIn">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-400" aria-label="Twitter">
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-800" aria-label="GitHub">
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="technical" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={getLocalizedName(member)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{getLocalizedName(member)}</h3>
                    <p className="text-primary font-medium mb-3">{getLocalizedTitle(member)}</p>
                    <p className="text-neutral-600 text-sm mb-4">{getLocalizedBio(member)}</p>
                    <div className="flex space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-600" aria-label="LinkedIn">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-400" aria-label="Twitter">
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-800" aria-label="GitHub">
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="directors" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={getLocalizedName(member)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{getLocalizedName(member)}</h3>
                    <p className="text-primary font-medium mb-3">{getLocalizedTitle(member)}</p>
                    <p className="text-neutral-600 text-sm mb-4">{getLocalizedBio(member)}</p>
                    <div className="flex space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-600" aria-label="LinkedIn">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-400" aria-label="Twitter">
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-800" aria-label="GitHub">
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advisors" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={getLocalizedName(member)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{getLocalizedName(member)}</h3>
                    <p className="text-primary font-medium mb-3">{getLocalizedTitle(member)}</p>
                    <p className="text-neutral-600 text-sm mb-4">{getLocalizedBio(member)}</p>
                    <div className="flex space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-600" aria-label="LinkedIn">
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-400" aria-label="Twitter">
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-800" aria-label="GitHub">
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('team.joinUs.title')}</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">{t('team.joinUs.description')}</p>
          <Link href="/careers" className="inline-block">
            <button className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
              {t('team.joinUs.button')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}