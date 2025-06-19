'use client';
import * as React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content - 중앙 정렬 */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        {/* Header */}
        <header className="flex flex-col gap-6 items-center mb-16 w-[356px] max-md:w-full max-md:max-w-[356px]">
          <h1 className="self-stretch text-5xl font-bold leading-tight text-center text-sky-700 max-md:text-5xl max-sm:text-4xl">
            AIOrtho
          </h1>
          <p className="self-stretch text-2xl leading-relaxed text-center text-slate-500 max-md:text-lg max-sm:text-base">
            아이 사경 치료 관리자 페이지
          </p>
        </header>

        {/* Login Actions */}
        <section className="inline-flex gap-5 items-center mb-12 w-[356px] max-md:w-full max-md:max-w-[356px] max-sm:flex-col max-sm:gap-4 max-sm:w-full">
          <Link
            href="/doctor/auth"
            className="flex gap-2.5 justify-center items-center px-5 py-4 h-16 rounded-2xl cursor-pointer w-[168px] max-sm:w-full max-sm:max-w-[280px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-sky-700 hover:bg-sky-800 focus:ring-sky-500"
            aria-label="의사로 로그인"
          >
            <span className="text-lg font-bold leading-6 text-white">의사로 접속</span>
          </Link>

          <Link
            href="/nurse/auth"
            className="flex gap-2.5 justify-center items-center px-5 py-4 h-16 rounded-2xl cursor-pointer w-[168px] max-sm:w-full max-sm:max-w-[280px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-700 hover:bg-gray-800 focus:ring-gray-500"
            aria-label="간호사로 로그인"
          >
            <span className="text-lg font-bold leading-6 text-white">간호사로 접속</span>
          </Link>
        </section>

        {/* Registration Link */}
        <div className="flex flex-col  items-center w-[540px] max-md:w-full max-md:max-w-[540px] max-sm:box-border max-sm:px-5 max-sm:w-full">
          <Link
            href="/doctor/auth/pre-register"
            className="text-sm leading-5 text-center underline cursor-pointer decoration-auto decoration-solid text-slate-500 underline-offset-auto w-full hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200 py-2"
            aria-label="회원가입 페이지로 이동"
          >
            처음 방문하셨나요?
          </Link>
          <Link
            href="/doctor/home"
            className="text-sm leading-5 text-center underline cursor-pointer decoration-auto decoration-solid text-slate-500 underline-offset-auto w-full hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200 py-2"
            aria-label="의사홈으로 이동"
          >
            의사홈으로(임시)
          </Link>
          <Link
            href="/nurse/home"
            className="text-sm leading-5 text-center underline cursor-pointer decoration-auto decoration-solid text-slate-500 underline-offset-auto w-full hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200 py-2"
            aria-label="간호사홈으로 이동"
          >
            간호사홈으로(임시)
          </Link>
        </div>
      </main>

      {/* Footer - 하단 고정 */}
      <Footer />
    </div>
  );
}
