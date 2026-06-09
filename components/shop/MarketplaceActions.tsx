"use client";

import { ButtonLink } from "@/components/ui/Button";
import { type MarketplaceLinks } from "@/lib/products/product-types";
import { siteConfig } from "@/lib/site-config";
import { ExternalLink, Mail } from "lucide-react";

interface MarketplaceActionsProps {
  marketplaceLinks: MarketplaceLinks;
  offeringTitle: string;
  customOrderSupported: boolean;
  className?: string;
}

export function MarketplaceActions({
  marketplaceLinks,
  offeringTitle,
  customOrderSupported,
  className = "",
}: MarketplaceActionsProps) {
  const generateMailtoLink = () => {
    const email = siteConfig.contact.email;
    const subject = encodeURIComponent(`Custom Project Inquiry - ${offeringTitle}`);
    const body = encodeURIComponent(
`Hello,

I am interested in discussing a custom project related to:

${offeringTitle}

Project Requirements:

[Client writes here]

Timeline:

[Client writes here]

Budget:

[Client writes here]`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const hasMarketplaceLinks =
    marketplaceLinks.fiverr ||
    marketplaceLinks.sproutGigs ||
    marketplaceLinks.gumroad ||
    marketplaceLinks.payhip;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Primary CTA - Fiverr */}
      {marketplaceLinks.fiverr && (
        <ButtonLink
          href={marketplaceLinks.fiverr}
          variant="primary"
          size="lg"
          className="w-full"
          external
          aria-label={`Order ${offeringTitle} on Fiverr (opens in new tab)`}
        >
          Order on Fiverr
          <ExternalLink size={16} className="ml-2" aria-hidden="true" />
        </ButtonLink>
      )}

      {/* Secondary CTAs */}
      <div className="flex flex-col gap-3">
        {marketplaceLinks.sproutGigs && (
          <ButtonLink
            href={marketplaceLinks.sproutGigs}
            variant="ghost"
            size="lg"
            className="w-full"
            external
            aria-label={`Order ${offeringTitle} on SproutGigs (opens in new tab)`}
          >
            Order on SproutGigs
            <ExternalLink size={16} className="ml-2" aria-hidden="true" />
          </ButtonLink>
        )}

        {marketplaceLinks.gumroad && (
          <ButtonLink
            href={marketplaceLinks.gumroad}
            variant="ghost"
            size="lg"
            className="w-full"
            external
            aria-label={`Buy ${offeringTitle} on Gumroad (opens in new tab)`}
          >
            Buy on Gumroad
            <ExternalLink size={16} className="ml-2" aria-hidden="true" />
          </ButtonLink>
        )}

        {marketplaceLinks.payhip && (
          <ButtonLink
            href={marketplaceLinks.payhip}
            variant="ghost"
            size="lg"
            className="w-full"
            external
            aria-label={`Buy ${offeringTitle} on Payhip (opens in new tab)`}
          >
            Buy on Payhip
            <ExternalLink size={16} className="ml-2" aria-hidden="true" />
          </ButtonLink>
        )}
      </div>

      {/* Custom Order CTA */}
      {customOrderSupported && (
        <ButtonLink
          href={generateMailtoLink()}
          variant="neon"
          size="lg"
          className="w-full"
          aria-label={`Request custom build for ${offeringTitle}`}
        >
          Request Custom Build
          <Mail size={16} className="ml-2" aria-hidden="true" />
        </ButtonLink>
      )}

      {/* No marketplace links message */}
      {!hasMarketplaceLinks && !customOrderSupported && (
        <p className="text-sm text-[var(--text-muted)]">
          Contact for availability
        </p>
      )}
    </div>
  );
}
