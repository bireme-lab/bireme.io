/* eslint-disable @next/next/no-img-element */

import { Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { GeistSans } from "geist/font/sans";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { match, P } from "ts-pattern";

// Route segment config
export const runtime = "nodejs";

const getPost = async (slug: string, locale: Locale) => {
  return match(await MDX.Post.findBySlug(slug, locale))
    .with(Option.P.Some(P.select()), (post) => post)
    .otherwise(() => undefined);
};

type Props = {
  params: {
    post_slug: string;
    locale: Locale;
  };
};

export async function generateImageMetadata({ params }: Props) {
  const post = await getPost(params.post_slug, params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });

  if (!post) {
    return [
      {
        id: "default",
        size: { width: 1200, height: 630 },
        alt: t("title"),
        contentType: "image/png",
      },
    ];
  }

  return [
    {
      id: post.slug,
      size: { width: 1200, height: 630 },
      alt: post.title,
      contentType: "image/png",
    },
  ];
}

const Image = async ({ params }: Props) => {
  const post = await getPost(params.post_slug, params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <img
            src={`${ORIGIN}/images/opengraph-images/${params.locale}.png?v=2`}
            alt={t("title")}
            width={1200}
            height={630}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          ...GeistSans.style,
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: 48,
        }}
      >
        <img
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          src={`${ORIGIN}/images/opengraph-images/default.png?v=2`}
          alt={post.title}
        />
        <div
          style={{
            position: "relative",
            left: 50,
            display: "flex",
            maxWidth: 800,
          }}
        >
          <div
            style={{
              backgroundImage: "linear-gradient(to right top, #F9EADE 30%, #FFC799)",
              backgroundClip: "text",
              // @ts-expect-error -webkit-background-clip is not in the typings
              "-webkit-background-clip": "text",
              color: "transparent",
            }}
          >
            {post.title}
          </div>
        </div>
        <svg
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            left: 50,
            width: 192,
            height: 46,
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="143"
          height="32"
          fill="none"
        >
          <path
            fill="url(#a)"
            d="M16.969 21.453h-2.758v-4.25h2.836c.542 0 1.008.096 1.399.289.395.192.7.458.914.796.213.339.32.73.32 1.172 0 .604-.216 1.089-.648 1.453-.433.36-1.12.54-2.063.54Z"
          />
          <path
            fill="url(#b)"
            d="M16.719 14.914h-2.508v-3.961h2.57c.75 0 1.329.177 1.735.53.411.355.617.821.617 1.4 0 .421-.107.783-.32 1.085a2.054 2.054 0 0 1-.86.703c-.359.162-.77.243-1.234.243Z"
          />
          <path
            fill="url(#c)"
            fill-rule="evenodd"
            d="M4 0a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm6.828 8.218v16h6.836c1.198 0 2.206-.192 3.024-.578.818-.385 1.435-.909 1.851-1.57.422-.667.633-1.425.633-2.274 0-.786-.166-1.463-.5-2.031a3.65 3.65 0 0 0-1.305-1.336 3.583 3.583 0 0 0-1.71-.515v-.157a4.227 4.227 0 0 0 1.484-.633 3.237 3.237 0 0 0 1.031-1.156c.25-.474.375-1.023.375-1.648 0-.802-.198-1.51-.594-2.125-.395-.62-.987-1.104-1.773-1.453-.787-.35-1.768-.524-2.945-.524h-6.407Z"
            clip-rule="evenodd"
          />
          <path
            fill="url(#d)"
            d="M43 23.732V8.062h5.276c1.018 0 1.866.178 2.543.535.682.357 1.193.844 1.534 1.461.341.618.512 1.319.512 2.105 0 .653-.11 1.211-.329 1.675-.218.465-.516.84-.893 1.125a3.685 3.685 0 0 1-1.26.62v.122c.504.036.993.215 1.466.536.474.316.863.76 1.169 1.332.305.57.458 1.254.458 2.05 0 .79-.176 1.497-.527 2.12-.351.617-.891 1.104-1.619 1.461-.723.352-1.644.528-2.764.528H43Zm1.428-1.285h4.138c1.206 0 2.097-.268 2.672-.804.58-.535.87-1.209.87-2.02 0-.597-.144-1.137-.434-1.622a3.068 3.068 0 0 0-1.214-1.163c-.52-.286-1.13-.429-1.833-.429h-4.2v6.038Zm0-7.308h3.978c.616 0 1.155-.127 1.619-.382a2.77 2.77 0 0 0 1.084-1.056c.26-.45.39-.962.39-1.538 0-.832-.27-1.508-.81-2.028-.54-.526-1.344-.788-2.413-.788h-3.848v5.792Z"
          />
          <path
            fill="url(#e)"
            d="M55.579 23.732V11.98h1.367v11.753h-1.367Zm.695-13.773c-.28 0-.52-.095-.718-.283a.94.94 0 0 1-.298-.697c0-.27.1-.5.298-.688A.99.99 0 0 1 56.274 8c.28 0 .519.097.717.29a.915.915 0 0 1 .298.69c0 .27-.1.502-.298.696a1.004 1.004 0 0 1-.717.283Z"
          />
          <path
            fill="url(#f)"
            d="M59.465 23.732V11.98h1.32v1.806h.1c.234-.592.641-1.069 1.222-1.431.585-.367 1.247-.551 1.985-.551a19.162 19.162 0 0 1 .718.023v1.385c-.062-.01-.169-.026-.321-.046a3.757 3.757 0 0 0-.497-.03c-.61 0-1.155.13-1.633.39a2.89 2.89 0 0 0-1.123 1.063 2.94 2.94 0 0 0-.412 1.554v7.59h-1.36Z"
          />
          <path
            fill="url(#g)"
            d="M70.438 23.977c-1.094 0-2.04-.255-2.84-.765-.8-.515-1.418-1.227-1.855-2.135-.433-.913-.65-1.964-.65-3.153 0-1.183.217-2.234.65-3.152.437-.923 1.04-1.645 1.81-2.166.773-.525 1.666-.788 2.68-.788.635 0 1.249.118 1.84.352.59.23 1.119.584 1.587 1.064.474.474.848 1.074 1.123 1.798.275.72.412 1.571.412 2.556v.673h-9.162V17.06h7.772c0-.755-.152-1.434-.458-2.036a3.567 3.567 0 0 0-1.26-1.438c-.534-.352-1.153-.528-1.855-.528-.743 0-1.397.199-1.962.597a4.099 4.099 0 0 0-1.329 1.576 4.934 4.934 0 0 0-.48 2.143v.719c0 .933.16 1.75.48 2.448.326.694.787 1.232 1.382 1.615.596.383 1.3.574 2.115.574.555 0 1.041-.087 1.459-.26a3.094 3.094 0 0 0 1.718-1.668l1.29.42a3.81 3.81 0 0 1-.878 1.37 4.47 4.47 0 0 1-1.512 1.01c-.6.25-1.293.375-2.077.375Z"
          />
          <path
            fill="url(#h)"
            d="M77.115 23.732V11.98h1.32v1.806h.123a2.884 2.884 0 0 1 1.168-1.431c.55-.352 1.21-.528 1.978-.528.81 0 1.473.191 1.993.574.524.377.916.898 1.175 1.56h.1a3.261 3.261 0 0 1 1.29-1.553c.6-.387 1.329-.581 2.184-.581 1.089 0 1.95.344 2.58 1.033.632.684.947 1.683.947 3v7.873h-1.359v-7.874c0-.928-.237-1.624-.71-2.088-.473-.465-1.097-.697-1.87-.697-.897 0-1.586.276-2.07.827-.483.55-.725 1.25-.725 2.096v7.736h-1.39v-7.996c0-.796-.221-1.439-.664-1.928-.443-.49-1.066-.735-1.87-.735-.54 0-1.026.133-1.459.398a2.816 2.816 0 0 0-1.015 1.11c-.245.469-.367 1.01-.367 1.622v7.53h-1.36Z"
          />
          <path
            fill="url(#i)"
            d="M99.238 23.977c-1.094 0-2.041-.255-2.84-.765-.8-.515-1.418-1.227-1.856-2.135-.433-.913-.649-1.964-.649-3.153 0-1.183.216-2.234.65-3.152.437-.923 1.04-1.645 1.809-2.166.773-.525 1.667-.788 2.68-.788.636 0 1.249.118 1.84.352.59.23 1.12.584 1.588 1.064.473.474.847 1.074 1.122 1.798.275.72.413 1.571.413 2.556v.673h-9.163V17.06h7.773c0-.755-.153-1.434-.458-2.036a3.562 3.562 0 0 0-1.26-1.438c-.534-.352-1.153-.528-1.855-.528-.743 0-1.398.199-1.963.597a4.099 4.099 0 0 0-1.328 1.576 4.932 4.932 0 0 0-.481 2.143v.719c0 .933.16 1.75.48 2.448.327.694.787 1.232 1.383 1.615.595.383 1.3.574 2.115.574.555 0 1.041-.087 1.458-.26a3.084 3.084 0 0 0 1.718-1.668l1.291.42a3.814 3.814 0 0 1-.879 1.37 4.473 4.473 0 0 1-1.511 1.01c-.601.25-1.293.375-2.077.375Z"
          />
          <path fill="url(#j)" d="M111.169 23.732V8.062h1.428v14.385h7.452v1.285h-8.88Z" />
          <path
            fill="url(#k)"
            d="M125.181 24a4.496 4.496 0 0 1-1.939-.413 3.395 3.395 0 0 1-1.397-1.21c-.346-.53-.519-1.172-.519-1.927 0-.582.109-1.072.328-1.47.219-.398.529-.724.931-.979a5.17 5.17 0 0 1 1.428-.605c.55-.148 1.156-.262 1.817-.344.657-.081 1.212-.153 1.665-.214.458-.061.807-.158 1.046-.29.239-.133.359-.348.359-.644v-.275c0-.801-.239-1.431-.718-1.89-.473-.464-1.155-.696-2.046-.696-.845 0-1.535.186-2.069.558-.53.372-.901.811-1.115 1.316l-1.29-.466c.264-.643.631-1.156 1.099-1.539a4.338 4.338 0 0 1 1.573-.834 6.127 6.127 0 0 1 1.764-.26c.448 0 .913.059 1.397.176a3.98 3.98 0 0 1 1.359.612c.417.286.756.687 1.016 1.202.259.51.389 1.158.389 1.943v7.981H128.9v-1.86h-.084a3.759 3.759 0 0 1-1.932 1.813c-.483.21-1.051.315-1.703.315Zm.184-1.247c.723 0 1.349-.16 1.878-.482a3.307 3.307 0 0 0 1.222-1.278c.29-.536.435-1.125.435-1.768v-1.699c-.102.098-.272.184-.512.26a7 7 0 0 1-.817.207c-.305.056-.61.105-.916.146l-.825.107c-.661.081-1.226.209-1.695.382-.468.174-.827.414-1.076.72-.25.3-.374.688-.374 1.163 0 .714.254 1.267.763 1.66.509.388 1.148.582 1.917.582Z"
          />
          <path
            fill="url(#l)"
            d="M133.082 23.732V8.062h1.366v6.159h.123c.152-.352.371-.714.656-1.087.29-.372.67-.683 1.138-.933.473-.255 1.069-.383 1.787-.383.962 0 1.807.255 2.535.766.727.505 1.295 1.213 1.702 2.127.407.908.611 1.966.611 3.175 0 1.214-.204 2.278-.611 3.191-.402.913-.967 1.625-1.695 2.135-.723.51-1.563.765-2.52.765-.712 0-1.308-.128-1.786-.383a3.565 3.565 0 0 1-1.145-.94 5.356 5.356 0 0 1-.672-1.103h-.168v2.181h-1.321Zm1.344-5.869c0 .95.14 1.79.419 2.525.286.73.693 1.304 1.222 1.722.535.413 1.181.62 1.94.62.778 0 1.437-.215 1.977-.643.54-.434.949-1.018 1.229-1.752.28-.735.42-1.559.42-2.472 0-.903-.14-1.716-.42-2.44-.275-.725-.682-1.299-1.221-1.722-.54-.429-1.202-.643-1.985-.643-.764 0-1.413.207-1.947.62-.53.408-.935.974-1.215 1.698-.279.72-.419 1.549-.419 2.487Z"
          />
          <defs>
            <linearGradient id="a" x1="1.2" x2="32" y1="2.4" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient id="b" x1="1.2" x2="32" y1="2.4" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient id="c" x1="1.2" x2="32" y1="2.4" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="d"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="e"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="f"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="g"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="h"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="i"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="j"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="k"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
            <linearGradient
              id="l"
              x1="30.5"
              x2="216.091"
              y1="-6"
              y2="62.754"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#FFC799" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};

export default Image;
