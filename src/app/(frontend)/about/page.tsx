import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  )
}

const AboutContent = () => {
  const team = [
    {
      name: "Bijak",
      role: "Leader",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "10+ tahun pengalaman dalam kepemimpinan teknologi dan strategi produk."
    },
    {
      name: "Danes",
      role: "Business Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Sang penyusun strategi bisnis yang idenya selalu saja tepat."
    },
    {
      name: "Noveryan",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Ahli dalam pengembangan full-stack dengan hasrat untuk solusi inovatif."
    },
    {
      name: "Gilang",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Desainer pemenang penghargaan yang fokus pada penciptaan pengalaman pengguna yang luar biasa."
    },
    {
      name: "Udin",
      role: "Lead Content Creator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Pembuat konten dengan tingkat kreativitas tinggi melebihi batas akal sehat manusia."
    }
  ]

  const whyChooseUs = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Proses Cepat Kilat",
      description: "Proyek kamu selesai 40% lebih cepat dari rata-rata industri tanpa mengorbankan kualitas."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Jaminan Kualitas 100%",
      description: "Setiap proyek selalu melewati pengujian ketat dan quality assurance sebelum dikirim ke kamu."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Dukungan 24/7",
      description: "Dukungan sepanjang waktu untuk memastikan aplikasi kamu berjalan lancar setiap saat."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Harga Transparan",
      description: "Tidak ada biaya tersembunyi. Harga yang jelas dan terperinci dengan rincian proyek."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Teknologi Terdepan",
      description: "Kami menggunakan teknologi terbaru dan praktik terbaik untuk memastikan solusi kamu siap masa depan."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Pendekatan Utamakan Klien",
      description: "Kesuksesan kamu adalah prioritas kami. Kami menyesuaikan setiap solusi dengan kebutuhan unik kamu."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#FAFAFA] via-[#E6F2FF] to-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#1E90FF]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#E6F2FF] text-[#0057B8] text-sm font-semibold rounded-full mb-6">
            Tentang Gawein
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Menginovasi{' '}
            <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
              Masa Depan Digital
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami adalah tim teknolog, desainer, dan ahli strategi yang berdedikasi untuk
            mentransformasi bisnis melalui solusi digital inovatif.
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-20 bg-gradient-to-b from-[#FAFAFA] to-[#E6F2FF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Kisah Kami
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Didirikan pada tahun 2019, Gawein muncul dari sebuah keyakinan sederhana: teknologi harus memberdayakan bisnis,
                    bukan mempersulitnya. Para pendiri kami, yang berasal dari latar belakang yang beragam dalam rekayasa perangkat lunak,
                    desain, dan strategi bisnis, menyadari adanya kesenjangan antara teknologi mutakhir dan aplikasi bisnis yang praktis.
                  </p>
                  <p>
                    Apa yang dimulai sebagai tim kecil yang terdiri dari lima individu yang penuh semangat telah berkembang menjadi perusahaan dinamis
                    yang melayani klien di berbagai industri. Kami telah mempertahankan kelincahan startup kami sambil membangun
                    keahlian tingkat perusahaan, memungkinkan kami untuk memberikan solusi inovatif dan hasil yang dapat diandalkan.
                  </p>
                  <p>
                    Saat ini, kami bangga telah menyelesaikan lebih dari 100 proyek sukses, membantu bisnis dari semua ukuran menavigasi
                    perjalanan transformasi digital mereka. Komitmen kami terhadap keunggulan, inovasi, dan keberhasilan klien terus mendorong
                    segala yang kami lakukan.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#FAFAFA] to-[#E6F2FF] rounded-3xl p-8 backdrop-blur-sm border border-[#E6F2FF] shadow-2xl">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent mb-2">
                      100+
                    </div>
                    <p className="text-gray-600">Proyek Selesai</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent mb-2">
                      50+
                    </div>
                    <p className="text-gray-600">Klien Puas</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent mb-2">
                      5+
                    </div>
                    <p className="text-gray-600">Tahun Pengalaman</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent mb-2">
                      15
                    </div>
                    <p className="text-gray-600">Anggota Tim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-[#E6F2FF]/30 via-[#FAFAFA] to-[#E6F2FF]/50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#1E90FF]/10 to-[#0057B8]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Kenali{' '}
              <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                Tim Ahli Kami
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tim ahli kami yang beragam menggabungkan bertahun-tahun pengalaman dalam teknologi, desain,
              dan strategi bisnis untuk memberikan hasil yang luar biasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#E6F2FF] group-hover:border-[#1E90FF] transition-colors duration-300"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#1E90FF] font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAFAFA] to-[#E6F2FF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Kenapa Memilih{' '}
              <span className="bg-gradient-to-r from-[#1E90FF] to-[#0057B8] bg-clip-text text-transparent">
                Gawein?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kami menggabungkan keahlian teknis dengan naluri bisnis untuk memberikan solusi yang
              tidak hanya berfungsi dengan sempurna tetapi juga mendorong hasil bisnis yang nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-[#FAFAFA]/80 backdrop-blur-sm border border-[#E6F2FF] rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#0057B8] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
