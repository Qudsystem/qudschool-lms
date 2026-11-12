const partners = [
  { 
    name: 'Microsoft', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' 
  },
  { 
    name: 'Google', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' 
  },
  { 
    name: 'MIT', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg' 
  },
  { 
    name: 'UNICEF', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/UNICEF_-_Logo_-_Blue_-_Gradient_-_Horizontal.svg' 
  },
  { 
    name: 'Stanford University', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_Cardinal_logo.svg' 
  }
];

const Partners = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">شركاء النجاح</h2>
          <p className="text-gray-600 mt-2">نفخر بالتعاون مع أفضل المؤسسات التعليمية والتقنية حول العالم</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
