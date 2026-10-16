import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles,
  Landmark,
  Palmtree,
  Hotel,
  Briefcase,
  Plane,
  TrendingUp,
  Users,
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Landmark,
  Palmtree,
  Hotel,
  Briefcase,
  Plane,
  TrendingUp,
  Users
};

const ServiceCard = ({ service, index = 0 }) => {
  if (!service) return null;

  const IconComponent = iconMap[service.iconName] || Sparkles;

  return (
    <motion.div
      className="group bg-white rounded-2xl border border-stone-200/80 p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div>
        {/* Top: Icon + Category Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#CBBD93]/25 text-[#574A24] flex items-center justify-center group-hover:bg-[#CBBD93] group-hover:text-[#574A24] transition-colors duration-300">
            <IconComponent size={22} strokeWidth={1.8} />
          </div>
          <span className="px-3 py-1 bg-[#FAE8B4]/40 border border-[#CBBD93]/30 text-plum text-[11px] font-bold tracking-wider uppercase rounded-full font-sans">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-[22px] font-bold text-plum group-hover:text-coral transition-colors leading-snug mb-2">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="text-[11px] font-sans font-bold text-coral uppercase tracking-wider mb-2.5">
          {service.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-taupe-dark leading-relaxed font-sans mb-5">
          {service.description}
        </p>

        {/* Benefits Preview */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-stone-100 mb-6">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-taupe-light block mb-2">
              Key Advantages
            </span>
            {service.benefits.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-sans">
                <CheckCircle2 size={13} className="text-coral shrink-0" />
                <span className="truncate font-medium">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-stone-100 flex items-center justify-between font-sans">
        <span className="text-xs font-bold text-coral">
          {service.stats}
        </span>
        <Link 
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-plum group-hover:text-coral transition-colors"
          aria-label={`Explore ${service.title}`}
        >
          <span>Explore Service</span>
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
