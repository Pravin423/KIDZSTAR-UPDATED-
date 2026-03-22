import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Team from "@/components/AboutUs/Team";
import { Poppins } from "next/font/google";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  CheckCircle2, 
  BookOpen, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Star, 
  Briefcase, 
  Users, 
  Laptop,
  ChevronsRight
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function TeacherTraining() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    phone: "",
    course: "",
    qualification: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  // Keep the navbar solid when scrolling
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsNavbarActive(latest > 0.05);
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error immediately upon typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "Letters and spaces only please.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Letters and spaces only please.";
    }

    if (!formData.email) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format.";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Must be exactly 10 digits.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }
    
    if (!formData.course) {
      newErrors.course = "Please select a training course.";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Highest qualification is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone.replace(/[^0-9]/g, ''),
      qualification: formData.qualification,
      location: formData.location,
      course: formData.course,
    };

    try {
      await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsSubmitted(true);
      setFormData({
        firstName: "", lastName: "", email: "", location: "", phone: "", course: "", qualification: ""
      });
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = [
    { title: "Introduction to Early Childhood Education", desc: "Importance of early education & Key theories of child development." },
    { title: "Child Development Stages", desc: "Physical, emotional, cognitive, and social growth & Age-appropriate strategies." },
    { title: "Classroom Management & Environment", desc: "Building safe, stimulating, and inclusive spaces & Positive behavior techniques." },
    { title: "Play-Based Learning", desc: "Harnessing play for education & Designing creative, interactive activities." },
    { title: "Language & Literacy Development", desc: "Fun ways to teach early literacy through storytelling, songs, and reading." },
    { title: "Numeracy in Early Childhood", desc: "Introducing math through hands-on activities & Everyday approaches to numbers." },
    { title: "Health, Safety & Nutrition", desc: "First-aid essentials while promoting hygiene and healthy habits." },
    { title: "Inclusive Education & Special Needs", desc: "Supporting diverse learners & Adapting strategies for children with disabilities." },
    { title: "Building Relationships with Parents", desc: "Effective communication and engaging parents in the learning journey." },
    { title: "Professionalism & Career Development", desc: "Ethical responsibilities of educators & Pathways for continuing education." },
  ];

  return (
    <>
      <Head>
        <title>Teacher's Training - KidzStar</title>
      </Head>

      <div className={`min-h-screen bg-[#F8F9FB] text-gray-800 ${poppins.className}`}>
        
        <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={!isNavbarActive} />

        {/* ── Brand Theme Hero Section ── */}
        <section className="relative text-white bg-[#000E30] pt-40 pb-28 px-4 md:px-10 overflow-hidden" style={{ backgroundImage: "url('/dd.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              Teacher's Training Courses
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              ECCED Training Course at <br className="hidden md:block"/>
              <span className="text-[#E6AF2E] drop-shadow-md">Kidzstar Pre Primary.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto opacity-90">
              Empower Yourself to Shape Young Minds with our comprehensive early childhood educator programs.
            </p>
          </div>

          {/* Smooth Wave Divider at bottom of Hero */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320">
              <path fill="#F8F9FB" fillOpacity="1" d="M0,160L80,170.7C160,181,320,203,480,208C640,213,800,203,960,181.3C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* ── Main Content Layout ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content Column */}
            <div className="flex-1 space-y-12">
              
              {/* Course Overview */}
              <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center text-[#0D3697]">
                    <BookOpen size={24} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#0D3697]">Course Overview</h2>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border-l-[6px] border-l-[#FF6D92]">
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    The Early Childhood Care and Education (ECCED) Training Course is designed to equip aspiring and current educators with the skills, knowledge, and tools to excel in early childhood education. From child development to classroom management, this comprehensive program prepares you to create nurturing, engaging, and inclusive learning environments for young children. 
                  </p>
                </div>
              </motion.div>

              {/* Quick Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  className="bg-white border text-gray-600 border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-3 mb-5 text-[#E6AF2E]">
                    <Clock size={28} />
                    <h3 className="text-2xl font-bold text-[#0D3697]">Duration</h3>
                  </div>
                  <ul className="space-y-4 font-medium">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#E6AF2E] shrink-0 mt-0.5" size={20} />
                      <span><strong>1 Year</strong> comprehensive program</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#E6AF2E] shrink-0 mt-0.5" size={20} />
                      <span>Flexible: In-person and online available</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  className="bg-white border text-gray-600 border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-3 mb-5 text-[#FF6D92]">
                    <Users size={28} />
                    <h3 className="text-2xl font-bold text-[#0D3697]">Eligibility</h3>
                  </div>
                  <ul className="space-y-4 font-medium">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6D92] shrink-0 mt-0.5" size={20} />
                      <span>Passion for working with young children</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6D92] shrink-0 mt-0.5" size={20} />
                      <span>Minimum qualification: 10+2 (Higher Sec)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6D92] shrink-0 mt-0.5" size={20} />
                      <span>No prior experience required</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Modules */}
              <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <h2 className="text-2xl font-extrabold mb-8 text-[#0D3697]">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {modules.map((mod, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all">
                      <span className="text-[#FF6D92] bg-[#FF6D92]/10 px-3 py-1 rounded-md text-xs font-bold mb-3 inline-block uppercase tracking-wider">Module {idx + 1}</span>
                      <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">{mod.title}</h4>
                      <p className="text-[15px] text-gray-500 leading-relaxed font-medium">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Methods & Certification */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-[#0D3697]">
                    <Laptop className="text-[#60CFFF]" size={24}/> Training Methods
                  </h3>
                  <div className="space-y-3">
                    {["Interactive Workshops", "Classroom Observations & Practice", "Online Learning Modules", "Group Discussions & Peer Feedback", "Field Visits to Preschools"].map((method, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 text-sm font-semibold text-gray-600 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-[#60CFFF] shrink-0"></div>
                        {method}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-[#0D3697]">
                    <GraduationCap className="text-[#E6AF2E]" size={26}/> Certification
                  </h3>
                  <div className="bg-[#E6AF2E]/10 border border-[#E6AF2E]/20 p-8 rounded-3xl h-[calc(100%-3rem)] flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <GraduationCap size={120} className="text-[#E6AF2E]" />
                    </div>
                    <p className="text-gray-700 italic font-medium leading-relaxed relative z-10 text-lg">
                      "Upon completion, you’ll earn a Certificate in Early Childhood Education and Development (ECCED), recognized by Kidzstar Pre Primary School and esteemed educational institutions."
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Why Choose Us */}
              <motion.div custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <div className="bg-[#000E30] text-white p-10 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                  {/* Subtle dark pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_100%_0%,#FF6D92,transparent_40%)]" />
                  
                  <h3 className="text-3xl font-extrabold mb-10 text-center relative z-10">Why Choose Our ECCED Training?</h3>
                  <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                    {[
                      "Learn from experienced educators and experts",
                      "Flexible learning: In-person or online",
                      "Hands-on training with real-world application",
                      "Join a supportive learning community",
                      "Job Placement Assistance after completion"
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FF6D92]/20 border border-[#FF6D92]/40 flex shrink-0 items-center justify-center text-[#FF6D92]">
                          <Star size={18} fill="currentColor" />
                        </div>
                        <p className="text-lg text-blue-50 font-medium pt-1.5">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Column (Sticky Form) */}
            <div className="lg:w-[420px]">
              <div className="sticky top-28">
                <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
                  
                  {/* Subtle top-glow on form card */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF6D92] via-[#E6AF2E] to-[#60CFFF]"></div>

                  <h3 className="text-2xl font-extrabold text-[#0D3697] mb-2 pt-2">
                    Start Your Journey
                  </h3>
                  <p className="text-sm font-medium text-gray-400 mb-8 border-b border-gray-100 pb-5">
                    Enroll for our teaching courses today.
                  </p>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-green-500" size={40} />
                      </div>
                      <h4 className="text-2xl font-bold text-[#0D3697] mb-3">Application Received!</h4>
                      <p className="text-gray-500 font-medium mb-8">We will get in touch with you shortly.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-sm font-bold text-[#FF6D92] hover:text-pink-600 transition-colors"
                      >
                        Submit another application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">First Name</label>
                          <input name="firstName" value={formData.firstName} onChange={handleChange}
                            className={`w-full bg-gray-50 border ${errors.firstName ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm`} />
                          {errors.firstName && <span className="text-red-500 text-[11px] font-bold block">{errors.firstName}</span>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Last Name</label>
                          <input name="lastName" value={formData.lastName} onChange={handleChange}
                            className={`w-full bg-gray-50 border ${errors.lastName ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm`} />
                          {errors.lastName && <span className="text-red-500 text-[11px] font-bold block">{errors.lastName}</span>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          className={`w-full bg-gray-50 border ${errors.email ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm`} />
                        {errors.email && <span className="text-red-500 text-[11px] font-bold block">{errors.email}</span>}
                      </div>

                       <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Current Location</label>
                        <div className="relative">
                          <MapPin size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.location ? 'text-red-400' : 'text-gray-400'}`} />
                          <input name="location" placeholder="City or area" value={formData.location} onChange={handleChange}
                            className={`w-full bg-gray-50 border ${errors.location ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm`} />
                        </div>
                        {errors.location && <span className="text-red-500 text-[11px] font-bold block">{errors.location}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9321002881"
                          className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm`} />
                        {errors.phone && <span className="text-red-500 text-[11px] font-bold block">{errors.phone}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Course</label>
                        <div className="relative">
                          <select name="course" value={formData.course} onChange={handleChange}
                            className={`appearance-none w-full bg-gray-50 border ${errors.course ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm cursor-pointer`}>
                            <option value="" disabled hidden>Select Course</option>
                            <option value="ECCED Training Course">ECCED Training Course</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                        {errors.course && <span className="text-red-500 text-[11px] font-bold block">{errors.course}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Highest Qualification</label>
                        <div className="relative">
                           <Briefcase size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.qualification ? 'text-red-400' : 'text-gray-400'}`} />
                          <input name="qualification" placeholder="e.g. 10+2, B.A." value={formData.qualification} onChange={handleChange}
                            className={`w-full bg-gray-50 border ${errors.qualification ? 'border-red-400 focus:bg-red-50' : 'border-gray-200'} text-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF6D92] focus:bg-white transition-all shadow-sm`} />
                        </div>
                        {errors.qualification && <span className="text-red-500 text-[11px] font-bold block">{errors.qualification}</span>}
                      </div>

                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="w-full mt-6 bg-[#FF6D92] text-white font-bold text-base tracking-wide py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(255,109,146,0.5)] hover:bg-[#e05070] hover:shadow-[0_12px_25px_-6px_rgba(255,109,146,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? "Submitting..." : (
                          <>
                            Submit Application <ChevronsRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>
        
        <Team />

        <Footer />
      </div>
    </>
  );
}
