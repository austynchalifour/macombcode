import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ReportResult } from "./report";

const colors = {
  navy: "#102030",
  navyDeep: "#0a1824",
  orange: "#d85818",
  paper: "#f4f6f8",
  mist: "#c5ced8",
  muted: "#3d4a57",
  white: "#ffffff",
  pass: "#1f6b4a",
  warn: "#d85818",
  fail: "#b42318",
  info: "#5b6b7a",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.navy,
    backgroundColor: colors.paper,
    paddingTop: 0,
    paddingBottom: 48,
  },
  header: {
    backgroundColor: colors.navyDeep,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 36,
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  brandMacomb: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    letterSpacing: 1.4,
    color: colors.white,
  },
  brandCode: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    letterSpacing: 1.4,
    color: colors.orange,
  },
  brandRule: {
    marginTop: 10,
    height: 2,
    width: 56,
    backgroundColor: colors.orange,
  },
  brandTag: {
    marginTop: 8,
    fontSize: 8,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.65)",
  },
  headerMeta: {
    marginTop: 18,
  },
  headerEyebrow: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.orange,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    color: colors.white,
    lineHeight: 1.25,
    maxWidth: 480,
  },
  headerUrl: {
    marginTop: 6,
    fontSize: 9,
    color: "rgba(255,255,255,0.7)",
  },
  content: {
    paddingHorizontal: 36,
  },
  sectionLabel: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.orange,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    color: colors.navy,
    marginBottom: 6,
  },
  sectionIntro: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 14,
    lineHeight: 1.45,
  },
  scoreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },
  scoreCard: {
    width: "31%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mist,
    padding: 12,
    minHeight: 92,
  },
  scoreCardLabel: {
    fontSize: 7,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.orange,
    marginBottom: 6,
  },
  scoreCardValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 26,
    color: colors.navy,
    marginBottom: 4,
  },
  scoreCardSummary: {
    fontSize: 8,
    color: colors.muted,
    lineHeight: 1.35,
  },
  recItem: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mist,
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    padding: 12,
    marginBottom: 8,
  },
  recMeta: {
    fontSize: 7,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.muted,
    marginBottom: 4,
  },
  recTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: colors.navy,
    marginBottom: 4,
  },
  recAction: {
    fontSize: 9,
    color: colors.muted,
    lineHeight: 1.4,
  },
  categoryBlock: {
    marginBottom: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mist,
    padding: 14,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.mist,
  },
  categoryName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    color: colors.navy,
  },
  categoryScore: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    color: colors.orange,
  },
  findingRow: {
    marginBottom: 7,
  },
  findingLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 2,
  },
  findingDetail: {
    fontSize: 8.5,
    color: colors.muted,
    lineHeight: 1.35,
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.mist,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: colors.muted,
    letterSpacing: 0.4,
  },
  footerBrand: {
    fontSize: 7,
    color: colors.navy,
    fontFamily: "Helvetica-Bold",
  },
  metaLine: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 16,
  },
});

function statusColor(status: string) {
  if (status === "pass") return colors.pass;
  if (status === "fail") return colors.fail;
  if (status === "warn") return colors.warn;
  return colors.info;
}

function Footer({ pageLabel }: { pageLabel: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerBrand}>MACOMB CODE</Text>
      <Text style={styles.footerText}>{pageLabel}</Text>
      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
}

function Header({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <Text style={styles.brandMacomb}>MACOMB</Text>
        <Text style={styles.brandCode}>CODE</Text>
      </View>
      <View style={styles.brandRule} />
      <Text style={styles.brandTag}>
        Websites & software for local businesses
      </Text>
      <View style={styles.headerMeta}>
        <Text style={styles.headerEyebrow}>Website analysis report</Text>
        <Text style={styles.headerTitle}>{title || url}</Text>
        <Link src={url} style={styles.headerUrl}>
          {url}
        </Link>
      </View>
    </View>
  );
}

export function AnalyzeReportDocument({
  result,
  topic,
}: {
  result: ReportResult;
  topic?: string;
}) {
  const analyzedAt = new Date(result.fetchedAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const categories: Array<{ name: string; data: ReportResult["seo"] }> = [
    { name: "Can customers reach you", data: result.reachability },
    { name: "Conversion basics", data: result.conversion },
    { name: "Relevance", data: result.relevance },
    { name: "SEO", data: result.seo },
    { name: "Readability", data: result.readability },
    { name: "Design", data: result.design },
    { name: "Freshness", data: result.freshness },
  ];

  const scoreCards = [
    {
      label: "Overall",
      score: result.overallScore,
      summary:
        "Weighted toward reachability and conversion — the stuff that costs you customers.",
    },
    ...categories.map((item) => ({
      label: item.name,
      score: item.data.score,
      summary: item.data.summary,
    })),
  ];

  const focus = topic?.trim() || result.focusTopic?.trim() || "";
  const ctaLine =
    result.overallScore >= 75
      ? "Solid foundation — book a free 15-minute call at macombcode.com/book to push it further."
      : "Want these fixed? Book a free 15-minute call at macombcode.com/book";

  return (
    <Document
      title={`Macomb Code Report — ${result.title || result.finalUrl}`}
      author="Macomb Code"
      subject="Website analysis report"
      creator="Macomb Code Analyzer"
    >
      <Page size="LETTER" style={styles.page}>
        <Header title={result.title} url={result.finalUrl} />
        <View style={styles.content}>
          <Text style={styles.metaLine}>
            Generated {analyzedAt}
            {focus ? `  ·  Focus topic: ${focus}` : ""}
          </Text>

          <Text style={styles.sectionLabel}>Score overview</Text>
          <Text style={styles.sectionTitle}>How this site performs</Text>
          <View style={styles.scoreGrid}>
            {scoreCards.map((card) => (
              <View key={card.label} style={styles.scoreCard} wrap={false}>
                <Text style={styles.scoreCardLabel}>{card.label}</Text>
                <Text style={styles.scoreCardValue}>{card.score}</Text>
                <Text style={styles.scoreCardSummary}>{card.summary}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Recommended updates</Text>
          <Text style={styles.sectionTitle}>What to improve next</Text>
          <Text style={styles.sectionIntro}>
            Prioritized fixes based on the gaps above. Start with high-priority
            items for the biggest lift.
          </Text>

          {result.recommendations.map((item, index) => (
            <View
              key={`${item.area}-${item.title}`}
              style={styles.recItem}
              wrap={false}
            >
              <Text style={styles.recMeta}>
                {String(index + 1).padStart(2, "0")} · {item.priority} ·{" "}
                {item.area}
              </Text>
              <Text style={styles.recTitle}>{item.title}</Text>
              <Text style={styles.recAction}>{item.action}</Text>
            </View>
          ))}

          <View style={[styles.recItem, { marginTop: 10 }]} wrap={false}>
            <Text style={styles.recMeta}>Next step</Text>
            <Text style={styles.recTitle}>{ctaLine}</Text>
            <Link src="https://macombcode.com/book" style={styles.recAction}>
              macombcode.com/book
            </Link>
          </View>
        </View>
        <Footer pageLabel="macombcode.com/analyze" />
      </Page>

      <Page size="LETTER" style={styles.page}>
        <Header title={result.title} url={result.finalUrl} />
        <View style={styles.content}>
          <Text style={styles.sectionLabel}>Detailed findings</Text>
          <Text style={styles.sectionTitle}>Category breakdown</Text>
          <Text style={styles.sectionIntro}>
            Full notes across reachability, conversion, relevance, SEO,
            readability, design, and freshness.
          </Text>

          {categories.map((category) => (
            <View key={category.name} style={styles.categoryBlock}>
              <View style={styles.categoryHeader} wrap={false}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryScore}>
                  {category.data.score}/100
                </Text>
              </View>
              <Text style={[styles.sectionIntro, { marginBottom: 10 }]}>
                {category.data.summary}
              </Text>
              {category.data.findings.map((finding) => (
                <View
                  key={`${category.name}-${finding.label}-${finding.detail}`}
                  style={styles.findingRow}
                  wrap={false}
                >
                  <Text
                    style={[
                      styles.findingLabel,
                      { color: statusColor(finding.status) },
                    ]}
                  >
                    {finding.label} · {finding.status}
                  </Text>
                  <Text style={styles.findingDetail}>{finding.detail}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Footer pageLabel="macombcode.com/analyze" />
      </Page>
    </Document>
  );
}
