import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">كودسكول</h3>
            <p className="text-gray-400 mb-6">
              المؤسسة التعليمية الرائدة في تقديم أفضل البرامج التعليمية للطلاب
              في مختلف المراحل الدراسية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">الرئيسية</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">من نحن</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-white transition duration-300">البرامج</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition duration-300">المشاريع</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition duration-300">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-blue-500 ml-2 mt-1" size={20} />
                <span className="text-gray-400">المقر الرئيسي، شارع المدارس، القاهرة، مصر</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-500 ml-2" size={20} />
                <span className="text-gray-400">+20 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-500 ml-2" size={20} />
                <span className="text-gray-400">info@qudschool.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">النشرة الإخبارية</h3>
            <p className="text-gray-400 mb-4">
              اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والعروض
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition duration-300"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} كودسكول. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
