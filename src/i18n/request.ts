import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // ✅ Usa await aquí:
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value || "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
