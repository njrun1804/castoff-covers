
import React from 'react';
import { CONTENT } from '../content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white text-navy flex items-center justify-center rounded-full">
                <i className="fa-solid fa-ghost text-sm"></i>
                </div>
                <span className="font-bold text-xl tracking-tight">{CONTENT.footer.brand}</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {CONTENT.footer.mission}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-sand">{CONTENT.footer.shop}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white">Chairs</a></li>
              <li><a href="#" className="hover:text-white">Sofas</a></li>
              <li><a href="#" className="hover:text-white">Tables</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-sand">{CONTENT.footer.legal}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} {CONTENT.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
