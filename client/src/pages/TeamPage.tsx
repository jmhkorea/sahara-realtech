import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

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
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // 팀원 데이터
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Han Ko, D.Sc.',
      title: 'Co-Founder & CEO',
      bio: 'Expertise: CTO/CEO, Software Development Management, VC, Investor, Global Marketing, Community Leader, Professor. CEO of USAKO Group with experience in Commercial RE Investment, Tech Scale-up, and Community Leadership.',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      linkedin: 'https://linkedin.com/in/hanko',
      department: 'executive'
    },
    {
      id: 2,
      name: 'Brian Jung',
      title: 'Co-Founder/CEO & CTO',
      bio: 'Computer Science Expert specializing in blockchain architecture development and DevOps. International e-Sports Federation Global Chief with education from Seoul National University GLP MBA and Dongguk University Fintech MBA.',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
      linkedin: 'https://linkedin.com/in/brianjung',
      department: 'executive'
    },
    {
      id: 3,
      name: 'Barbara Bickham',
      title: 'CTO',
      bio: 'Global Technical Engineer and CEO of Trailyn Ventures, LLC. Expertise in NFT, Blockchain, Investment, and Tech Scale-up with background at Morgan Stanley managed fund WIFAX and education from UC Berkeley.',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      linkedin: 'https://linkedin.com/in/barbarabickham',
      twitter: 'https://twitter.com/barbarabickham',
      department: 'executive'
    },
    {
      id: 4,
      name: 'Se Youl Park',
      title: 'Technical Lead',
      bio: 'Former IBM KOREA Director and Executive Information Technology Architect. Blockchain Technical Lead and CLT at IBM, selected as "Technical Leader at IBM" by media in 2022.',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      linkedin: 'https://linkedin.com/in/seyoulpark',
      department: 'technical'
    },
    {
      id: 5,
      name: 'Yeom Ki Ho',
      title: 'CTO',
      bio: 'CEO of Keystone Lab & KDEX Cryptocurrency Exchange. Author of Hanbit Academy Java Programming Bible (Bestseller) and Metaverse, NFT, blockchain expert.',
      imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      linkedin: 'https://linkedin.com/in/yeomkiho',
      department: 'technical'
    },
    {
      id: 6,
      name: 'Kim Hyun Chang',
      title: 'CTO',
      bio: 'Director of Pets DNA Labs and current CEO at Pet & Cats Bio Ltd. Previous experience includes IBM Korea, Softbank Korea, and POSTECH Special Engineer.',
      imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
      linkedin: 'https://linkedin.com/in/kimhyunchang',
      department: 'technical'
    },
    {
      id: 7,
      name: 'Tom Ray, JD',
      title: 'Executive Director',
      bio: 'C-Suite Commercial Real Estate professional with Juris Doctorate. Award-Winning Power Broker with REIT experience and Senior VP at CBRE (World\'s largest commercial real estate company).',
      imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
      linkedin: 'https://linkedin.com/in/tomray',
      department: 'directors'
    },
    {
      id: 8,
      name: 'Collin Knock',
      title: 'Executive Director',
      bio: 'Expertise in RE Lending, Financing, and Blockchain. Founded and operated one of top 100 financing companies in USA with experience in multiple successful tech and financing ventures.',
      imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
      linkedin: 'https://linkedin.com/in/collinknock',
      department: 'directors'
    },
    {
      id: 9,
      name: 'Dr. GT Wu, Ph.D & J.D',
      title: 'Executive Director',
      bio: 'Expertise in Investment, Legal & High Tech. Education includes Ph.D. from Cornell University, M.S. from Stanford University, B.S. from UC Berkeley, and J.D. from Fordham University.',
      imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
      linkedin: 'https://linkedin.com/in/gtwu',
      department: 'directors'
    },
    {
      id: 10,
      name: 'Frank Pica',
      title: 'Executive Director',
      bio: 'Specializes in Fund Raising and Product Development with expertise in AI Product and Blockchain for C-Suite Companies. Founding Member and VP of LockerDome (US) and Adyoulike (Europe).',
      imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
      linkedin: 'https://linkedin.com/in/frankpica',
      department: 'directors'
    },
    {
      id: 11,
      name: 'Yong Hyoung',
      title: 'Executive Director',
      bio: 'Tech Scale-up and Startup specialist. Founder of "Cyworld" (quoted as "the person who inspired Facebook") and proven Leader in Asia. Education from Korea Advanced Institute of Science and Technology (KAIST).',
      imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      linkedin: 'https://linkedin.com/in/yonghyoung',
      department: 'directors'
    },
    {
      id: 12,
      name: 'Dr. Eunice Ko, MD',
      title: 'Executive Director',
      bio: 'Medical Doctor with expertise in Real Estate and Blockchain Tech Investment, Fund Raising and Management, and Medical and Bio Tech.',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      linkedin: 'https://linkedin.com/in/euniceko',
      department: 'directors'
    },
    {
      id: 13,
      name: 'In Soo Kim',
      title: 'Advisor',
      bio: 'MBA from Seoul National University. Former CEO of Samjong KPMG Consulting and Former Vice President at Samjong KPMG.',
      imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      linkedin: 'https://linkedin.com/in/insookim',
      department: 'advisors'
    },
    {
      id: 14,
      name: 'Yoon Jae Hwan',
      title: 'Advisor',
      bio: 'Chairman of Ocean Star Sahara Resort, President of Korea Railroad Newspaper, President of Bichaena World Movement Headquarters, and President of Business Incubation Center.',
      imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
      linkedin: 'https://linkedin.com/in/yoonjaehwan',
      department: 'advisors'
    },
    {
      id: 15,
      name: 'Hyug-soon Kwon',
      title: 'Advisor',
      bio: 'Former Head of Fintech Center at KB Kookmin Bank with TECHNO MBA from KAIST University.',
      imageUrl: 'https://randomuser.me/api/portraits/men/14.jpg',
      linkedin: 'https://linkedin.com/in/hyugsoonkwon',
      department: 'advisors'
    },
    {
      id: 16,
      name: 'Won-bu Lee',
      title: 'Advisor',
      bio: 'Dean and Professor at Dongguk University Business School. Professor of Artificial Intelligence, Fintech, and Blockchain.',
      imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
      linkedin: 'https://linkedin.com/in/wonbulee',
      department: 'advisors'
    },
    {
      id: 17,
      name: 'Perry Chappell',
      title: 'Advisor',
      bio: 'Successful startup founder and strategist for Exits and M&As with 40 years of experience focusing on Consumer Markets and Startup Strategies. Current CEO and Co-founder of Zing Communications Inc.',
      imageUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
      linkedin: 'https://linkedin.com/in/perrychappell',
      department: 'advisors'
    }
  ];

  // 다국어 지원을 위한 이름, 직함, 소개 변환 함수
  const getLocalizedName = (member: TeamMember) => {
    return member.name;
  };

  const getLocalizedTitle = (member: TeamMember) => {
    return member.title;
  };

  const getLocalizedBio = (member: TeamMember) => {
    return member.bio;
  };

  // 활성 필터에 따라 팀원 필터링
  const filteredMembers = teamMembers.filter((member) => {
    if (activeFilter === 'all') return true;
    return member.department === activeFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          {t('team.title')}
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          {t('team.subtitle')}
        </p>
      </div>

      {/* 필터 버튼 */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
            ${activeFilter === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
        >
          {t('team.filters.all')}
        </button>
        <button
          onClick={() => setActiveFilter('executive')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
            ${activeFilter === 'executive' 
              ? 'bg-primary text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
        >
          {t('team.filters.executive')}
        </button>
        <button
          onClick={() => setActiveFilter('technical')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
            ${activeFilter === 'technical' 
              ? 'bg-primary text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
        >
          {t('team.filters.technical')}
        </button>
        <button
          onClick={() => setActiveFilter('directors')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
            ${activeFilter === 'directors' 
              ? 'bg-primary text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
        >
          {t('team.filters.directors')}
        </button>
        <button
          onClick={() => setActiveFilter('advisors')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
            ${activeFilter === 'advisors' 
              ? 'bg-primary text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
        >
          {t('team.filters.advisors')}
        </button>
      </div>

      {/* 팀원 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMembers.map((member) => (
          <div 
            key={member.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg"
          >
            <div className="p-1 bg-gradient-to-r from-primary to-primary-dark">
              <div className="bg-white pt-5 px-5">
                <img 
                  src={member.imageUrl} 
                  alt={getLocalizedName(member)} 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="p-2">
                  <h3 className="font-bold text-lg">{getLocalizedName(member)}</h3>
                  <p className="text-primary text-sm mb-2">{getLocalizedTitle(member)}</p>
                  <p className="text-neutral-600 text-sm line-clamp-4 mb-3">
                    {getLocalizedBio(member)}
                  </p>
                  
                  {/* 소셜 링크 */}
                  <div className="flex space-x-2 mt-2 mb-4">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-primary transition-colors"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    )}
                    {member.twitter && (
                      <a 
                        href={member.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-primary transition-colors"
                      >
                        <FaTwitter size={18} />
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-primary transition-colors"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 채용 섹션 */}
      <div className="mt-20 bg-neutral-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">{t('team.joinUs.title')}</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
          {t('team.joinUs.description')}
        </p>
        <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors">
          {t('team.joinUs.button')}
        </button>
      </div>
    </div>
  );
}