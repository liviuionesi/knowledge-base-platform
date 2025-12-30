import React from 'react';

export function FlagUS({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#bd3d44" d="M0 0h640v480H0"/>
      <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 424h640"/>
      <path fill="#192f5d" d="M0 0h296.2v258.5H0"/>
      <g fill="#fff">
        <g id="s18">
          <g id="s9">
            <g id="s5">
              <g id="s4">
                <path id="s" d="M24.8 14.6l12.8-4.3-8.8-11.5L24.8 14.6z"/>
                <use href="#s" x="49.2"/>
                <use href="#s" x="98.4"/>
                <use href="#s" x="147.6"/>
              </g>
              <use href="#s" x="49.2"/>
            </g>
            <use href="#s" x="98.4"/>
            <use href="#s" x="147.6"/>
            <use href="#s" x="196.8"/>
          </g>
          <use href="#s9" y="36.9"/>
        </g>
        <use href="#s18" y="73.8"/>
        <use href="#s18" y="147.6"/>
        <use href="#s18" y="221.4"/>
        <use href="#s9" y="295.2"/>
        <use href="#s4" y="36.9" x="24.6"/>
        <use href="#s4" y="110.7" x="24.6"/>
        <use href="#s4" y="184.5" x="24.6"/>
        <use href="#s4" y="258.3" x="24.6"/>
      </g>
    </svg>
  );
}

export function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z"/>
        <path fill="#00267f" d="M0 0h213.3v480H0z"/>
        <path fill="#f31830" d="M426.7 0H640v480H426.7z"/>
      </g>
    </svg>
  );
}
