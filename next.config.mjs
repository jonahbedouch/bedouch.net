//@ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 300,
            static: 600,
        },
        outputFileTracingIncludes: {
            '/': ['./content/**/*'],
        },
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withPlaiceholder(nextConfig);
