
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F4ED] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">

        {/* عنوان الصفحة */}
        <div className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#A8B9A5]" />
            <span className="text-xs tracking-[3px] text-[#A8B9A5]">
              يسعدنا تواصلكم
            </span>
            <span className="h-px w-12 bg-[#A8B9A5]" />
          </div>

          <h1 className="mb-5 text-3xl font-bold text-[#234C45] md:text-5xl">
            تواصل معنا
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-[#77766F] md:text-base">
            نحن هنا لجعل إقامتكم أكثر راحة، لا تترددوا في التواصل معنا
            لأي استفسار أو طلب، وسنسعد بمساعدتكم.
          </p>
        </div>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* معلومات التواصل */}
          <div className="rounded-[35px] bg-[#234C45] p-8 text-white lg:col-span-2 md:p-10">
            <h2 className="mb-4 text-2xl font-bold">
              يسعدنا خدمتكم
            </h2>

            <p className="mb-10 text-sm leading-8 text-[#E8DED0]">
              يمكنكم التواصل مع فريق الفندق للحصول على المساعدة
              والإجابة عن جميع استفساراتكم.
            </p>

            <div className="space-y-8">

              <div className="border-b border-white/15 pb-6">
                <p className="mb-2 text-xs text-[#A8B9A5]">
                  الفندق
                </p>
                <p className="text-lg font-semibold">
                  فندق الجابري
                </p>
              </div>

              <div className="border-b border-white/15 pb-6">
                <p className="mb-2 text-xs text-[#A8B9A5]">
                  الهاتف
                </p>
                <p className="text-sm text-[#E8DED0]">
                  سيتم إضافة رقم الفندق
                </p>
              </div>

              <div className="border-b border-white/15 pb-6">
                <p className="mb-2 text-xs text-[#A8B9A5]">
                  البريد الإلكتروني
                </p>
                <p className="text-sm text-[#E8DED0]">
                  سيتم إضافة البريد الإلكتروني
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-[#A8B9A5]">
                  الموقع
                </p>
                <p className="text-sm leading-7 text-[#E8DED0]">
                  سيتم إضافة عنوان الفندق
                </p>
              </div>

            </div>
          </div>

          {/* نموذج التواصل */}
          <div className="rounded-[35px] border border-[#E8DED0] bg-white p-8 md:p-10 lg:col-span-3">
            <h2 className="mb-3 text-2xl font-bold text-[#234C45]">
              أرسل لنا استفسارك
            </h2>

            <p className="mb-9 text-sm leading-7 text-[#77766F]">
              يرجى تعبئة البيانات التالية وسنسعد بالتواصل معكم.
            </p>

            <form className="space-y-6">

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#234C45]">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسمك"
                    required
                    className="w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none transition focus:border-[#A8B9A5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-[#234C45]">
                    رقم الغرفة
                  </label>
                  <input
                    type="text"
                    placeholder="رقم الغرفة (اختياري)"
                    className="w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none transition focus:border-[#A8B9A5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-[#234C45]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  required
                  className="w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none transition focus:border-[#A8B9A5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-[#234C45]">
                  موضوع الرسالة
                </label>
                <select
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none transition focus:border-[#A8B9A5] focus:bg-white"
                >
                  <option value="" disabled>اختر موضوع الرسالة</option>
                  <option>استفسار عام</option>
                  <option>طلب خدمة</option>
                  <option>مشكلة أثناء الإقامة</option>
                  <option>ملاحظات واقتراحات</option>
                  <option>أخرى</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-[#234C45]">
                  نص الرسالة
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full resize-none rounded-xl border border-[#E8DED0] bg-[#F7F4ED] px-4 py-4 text-sm text-[#234C45] outline-none transition focus:border-[#A8B9A5] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-4 rounded-xl bg-[#234C45] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#193A34]"
              >
                إرسال الرسالة
                <span className="directional-arrow text-lg">
                  ←
                </span>
              </button>

            </form>
          </div>
        </div>

        {/* ختام الصفحة */}
        <div className="mt-16 rounded-[45px] bg-white px-6 py-10 text-center md:py-12">
          <h2 className="mb-3 text-xl font-bold text-[#234C45] md:text-2xl">
            راحتكم تهمنا
          </h2>
          <p className="text-sm leading-8 text-[#77766F]">
            نسعى دائمًا لتقديم تجربة إقامة مميزة تلبي تطلعاتكم.
          </p>
        </div>

      </div>
    </main>
  );
}
