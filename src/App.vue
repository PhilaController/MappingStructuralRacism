<template>
  <div id="app">
    <div class="intro-section">
      <p>
        Philadelphia’s homicide rate has been on the rise, reaching a more than
        decades long high in 2018. The Office of the City Controller decided to
        study homicides as a result,
        <a
          href="https://controller.phila.gov/philadelphia-audits/economic-impact-of-homicides/"
          target="blank_"
        >releasing a report</a> on the economic
        impact of homicides in October 2019. The report analyzed historical data
        from 2006 through 2018 to quantify the effect of a single homicide on
        residential sale prices in Philadelphia and used the potential economic
        benefit of reducing homicides as a leverage point for the City to consider
        alternative or more concerted investment in proven violence reduction
        strategies. The report carefully noted the complex intersection of gun
        violence and intergenerational structural racism, including residential
        segregation, and its role in shaping Philadelphia’s neighborhoods today.
        Since the report’s release, 2019’s homicide rates have been finalized,
        surpassing 2018’s total. In an effort to provide additional historical
        context and support a better understanding of the collective
        responsibility for these challenges, the Controller’s Office mapped 2019’s
        homicides and present-day disadvantage alongside 1930s redlining maps.
        This interactive data release is part of an on-going analysis by the
        Controller’s Office of gun violence in Philadelphia.
      </p>
    </div>

    <div class="history-section mt-4">
      <h2>A History of Redlining</h2>
      <hr class="titlebar" />

      <p>
        During the first half of the 20th century, local and federal
        governments prevented African Americans and other minority populations
        from homeownership through the creation of discriminatory federal mortgage
        programs and redlined appraisal maps, as well as the use of racially
        restrictive stipulations written into deeds that prohibited certain races
        from the ownership of specific properties. These policies, which
        exclusively provided white populations with the access to capital and
        privilege necessary for homeownership, had a significant role in the
        racial segregation of American cities.
      </p>

      <p>
        Discriminatory lending practices became ingrained at the federal level
        during the 1930s with the creation of the Homeowners’ Loan Corporation
        (HOLC) and the Federal Housing Administration (FHA), New Deal programs
        that provided financial support to homeowners and aimed to increase
        homeownership in the wake of the Great Depression. HOLC refinanced home
        mortgages in default or at risk of foreclosure
        <sup>
          <a href="#fn1" id="ref1">[1]</a>
        </sup> and created now-infamous
        appraisal maps of cities across the country that included an explicit
        racial component. The FHA, which provided federal insurance for mortgages,
        relied on these neighborhood appraisals, as well other risk assessments,
        to tailor its underwriting policies to limit or prohibit mortgage
        insurance for individuals from neighborhoods deemed “risky.”
        <sup>
          <a href="#fn2" id="ref2">[2]</a>
        </sup>
      </p>

      <p>
        These discriminatory federal policies directed lending practices in the
        private sector, creating significant barriers to mortgage lending for
        African Americans and incentivizing white populations to move out of
        redlined neighborhoods and into approved, racially homogenous
        neighborhoods.
        <sup>
          <a href="#fn3" id="ref3">[3]</a>
        </sup> By the end of World War II, the definition of “white” had
        expanded to include Eastern European, Irish, and Jewish populations,
        <sup>
          <a href="#fn4" id="ref4">[4]</a>
        </sup>
        creating majority African American neighborhoods across America’s cities
        with depreciating property values and compounding disinvestment.
        Ultimately, the homeownership enabled by these programs allowed select
        populations to accumulate wealth through the 1960s, while redlining and
        other racially restrictive policies explicitly prevented African Americans
        from participating in this wealth building.
        <sup>
          <a href="#fn5" id="ref5">[5]</a>
        </sup>
      </p>

      <p>
        With the Fair Housing Act and the Civil Rights Act, redlining and other
        discriminatory housing policies were made illegal in 1968.
        <sup>
          <a href="#fn6" id="ref6">[6]</a>
          <a href="#fn7" id="ref7">[7]</a>
        </sup> However, discriminatory lending practices have persisted to this
        day in the form of “reverse redlining,” in which mortgage lenders charge
        African Americans and Latinos higher interest rates and fees on loans
        than their white counterparts.
        <sup>
          <a href="#fn8" id="ref8">[8]</a>
        </sup> In the years since the Great
        Recession, there have been a number of class-action lawsuits against
        major mortgage lenders for their reverse redlining practices, including
        in Philadelphia.
        <sup>
          <a href="#fn9" id="ref9">[9]</a>
        </sup>
      </p>
    </div>

    <div class="philly-redlining-section mt-4">
      <h2>The 1937 Redlining Map for Philadelphia</h2>
      <hr class="titlebar" />

      <p>
        As one of the country’s most racially segregated cities,
        <sup>
          <a href="#fn10" id="ref10">[10]</a>
        </sup> the history of structural racism described in the previous
        section is particularly important for Philadelphia. The HOLC’s appraisal
        map for the city is a striking illustration of this history. The 1937
        map, which can be seen below, includes large areas of the city
        classified as either“hazardous” (colored in red) or “definitely
        declining” (colored in yellow). The “redlined” zones typically had an
        “undesirable population” of African Americans, immigrants, and Jews,
        while the yellow zones showed evidence of an “infiltration of a lower
        grade population.”
        <sup>
          <a href="#fn11" id="ref11">[11]</a>
        </sup> These
        assessments stand in stark contrast to those for the green and blue zones,
        which were considered ideal for investment, had above-average housing
        conditions, and often contained a “homogenous” white and affluent
        population.
        <sup>
          <a href="#fn12" id="ref12">[12]</a>
        </sup>
      </p>

      <!-- Redlining map -->
      <RedliningMap class="mt-2" />
    </div>

    <div class="today-section mt-4">
      <h2>Redlined Neighborhoods Today</h2>
      <hr class="titlebar" />
      <p>
        Without access to lending and legal deed ownership, minority populations
        in Philadelphia were forced to reside in neighborhoods condemned by the
        federal government as unworthy of investment. This denial of opportunity
        has compounded in the decades since, leading to unequal outcomes across
        Philadelphia’s segregated neighborhoods nearly a century later.
        Historically redlined areas of Philadelphia continue to experience
        disproportionate amounts of poverty, poor health outcomes, limited
        educational attainment, unemployment, and violent crime compared to
        other neighborhoods in the city.
        <sup>
          <a href="#fn13" id="ref13">[13]</a>
        </sup>
      </p>

      <p>
        In particular, racial residential segregation is a key predictor of
        urban violence and homicide.
        <sup>
          <a href="#fn14" id="ref14">[14]</a>
        </sup> The chart below shows the locations of
        Philadelphia’s 357 homicides in 2019 — the most since 2007 — and the
        relationship to the risk assessments made by HOLC. It is clear that
        Philadelphia neighborhoods experiencing the highest levels of
        present-day violence are the same neighborhoods characterized as
        “hazardous” or “declining” in the HOLC map. In fact, 75 percent of all
        homicides in 2019 occurred in regions graded as “C” (declining) or “D”
        (hazardous) by the HOLC.
      </p>

      <div class="d-flex flex-column mt-2">
        <HomicidesMap class="homicides-map" />
        <div class="d-flex flex-column mt-4">
          <h4 class="flex-centered">Number of Homicides by HOLC Grade</h4>
          <HomicidesBarChart class="homicides-bar-chart" height="250" />
        </div>
      </div>

      <p class="mt-2">
        These redlined neighborhoods not only experience the highest levels of
        violence, but more broadly, they are the most disadvantaged communities in
        the city. The chart below shows present-day disadvantage across the city as
        measured from Census-based indicators, including public assistance usage,
        poverty rate, the number of female-headed households, and the population
        under 18 years old. As the figure shows, the most disadvantaged
        neighborhoods of the city today (darkest blue) were marked as “declining”
        (yellow areas) or “hazardous” (red areas) by the HOLC. These areas of the
        city have also experienced the highest levels of violence and homicide in
        recent years.
      </p>

      <DisadvantageMap />

      <p class="mt-3">
        Philadelphia has both the highest poverty rate and the highest homicide
        rate per capita of any of the ten largest cities in the country. As a
        city, we must acknowledge the root causes of present-day disadvantage —
        racial residential segregation and structural racism — that perpetuates
        the cycle of violence in certain communities and work together to develop
        a comprehensive, focused and data-driven response that stops homicides
        now. The Controller’s Office will continue to lean in on efforts to make
        Philadelphia’s neighborhoods safer, especially those neighborhoods where
        the legacy of structural racism still persists today.
      </p>
    </div>

    <!-- Footnotes -->
    <div class="footnotes-section mt-4">
      <h3>Footnotes</h3>
      <hr class="titlebar" />

      <!-- Footnote #1 -->
      <p>
        <a href="#ref1" id="fn1" title="Jump back to footnote 1 in the text.">[1]&nbsp;</a>
        <a
          href="https://rooseveltinstitute.org/home-owners-loan-corporation/"
          target="blank_"
        >https://rooseveltinstitute.org/home-owners-loan-corporation/</a>
      </p>

      <!-- Footnote #2 -->
      <p>
        <a href="#ref2" id="fn2" title="Jump back to footnote 2 in the text.">[2]&nbsp;</a>
        Hillier, A., 2003, pg 395.
      </p>

      <!-- Footnote #3 -->
      <p>
        <a href="#ref3" id="fn3" title="Jump back to footnote 3 in the text.">[3]&nbsp;</a>
        Nier, C. “Perpetuation of Segregation: Toward a New Historical and Legal
        Interpretation of Redlining under the Fair Housing Act.”
        <em>
          Marshall Law
          Review
        </em>, 1999.
      </p>

      <!-- Footnote #4 -->
      <p>
        <a href="#ref4" id="fn4" title="Jump back to footnote 4 in the text.">[4]&nbsp;</a>
        Sacks, K., “How Did Jews Become White Folks?”
        <em>
          How Did Jews Become White
          Folks & What That Says About Race in America
        </em>, 1998.
      </p>

      <!-- Footnote #5 -->
      <p>
        <a href="#ref5" id="fn5" title="Jump back to footnote 5 in the text.">[5]&nbsp;</a>
        Rothstein, Richard.
        <em>The Color of Law</em>, 184-185.
      </p>

      <!-- Footnote #6 -->
      <p>
        <a href="#ref6" id="fn6" title="Jump back to footnote 6 in the text.">[6]&nbsp;</a>
        “The Fair Housing Act…makes it unlawful for any lender to discriminate
        in its housing-related lending activities against any person because of
        race, color, religion, national origin, sex, handicap, or familial
        status.”
        <a
          href="https://www.federalreserve.gov/boarddocs/supmanual/cch/fair_lend_fhact.pdf"
          target="blank_"
        >https://www.federalreserve.gov/boarddocs/supmanual/cch/fair_lend_fhact.pdf</a>
      </p>

      <!-- Footnote #7 -->
      <p>
        <a href="#ref7" id="fn7" title="Jump back to footnote 7 in the text.">[7]&nbsp;</a>
        Santucci, L. “How Prevalent Were Racially Restrictive Covenants in 20th
        Century Philadelphia? A New Spatial Data Set Provides Answers,” Federal
        Reserve Bank of Philadelphia, 2019, p.15.
      </p>

      <!-- Footnote #8 -->
      <p>
        <a href="#ref8" id="fn8" title="Jump back to footnote 8 in the text.">[8]&nbsp;</a>
        Housain, A., 2016.
        <a
          href="https://mjrl.org/2016/11/02/reverse-redlining-and-the-destruction-of-minority-wealth/"
          target="blank_"
        >https://mjrl.org/2016/11/02/reverse-redlining-and-the-destruction-of-minority-wealth/</a>
      </p>

      <!-- Footnote #9 -->
      <p>
        <a href="#ref9" id="fn9" title="Jump back to footnote 9 in the text.">[9]&nbsp;</a>
        <a
          href="https://www.inquirer.com/real-estate/housing/philadelphia-settles-lawsuit-wells-fargo-allegations-discriminatory-mortgage-lending-minorities-20191216.html"
          target="blank_"
        >https://www.inquirer.com/real-estate/housing/philadelphia-settles-lawsuit-wells-fargo-allegations-discriminatory-mortgage-lending-minorities-20191216.html</a>
      </p>

      <!-- Footnote #10 -->
      <p>
        <a href="#ref10" id="fn10" title="Jump back to footnote 10 in the text.">[10]&nbsp;</a>
        Frey, W. and Myers, D., “Neighborhood Segregation in Single Race and
        Multirace America: A Census 2000 Study of Cities and Metropolitan
        Areas,” 2002.
      </p>

      <!-- Footnote #11 -->
      <p>
        <a href="#ref11" id="fn11" title="Jump back to footnote 11 in the text.">[11]&nbsp;</a>
        Hillier 2005; FHLBB Division of Research and Statistics 1937
      </p>

      <!-- Footnote #12 -->
      <p>
        <a href="#ref12" id="fn12" title="Jump back to footnote 12 in the text.">[12]&nbsp;</a>
        See e.g.,
        <a
          href="https://slate.com/news-and-politics/2015/05/racism-in-real-estate-landlords-redlining-housing-values-and-discrimination.html"
          target="blank_"
        >https://slate.com/news-and-politics/2015/05/racism-in-real-estate-landlords-redlining-housing-values-and-discrimination.html</a>
      </p>

      <!-- Footnote #13 -->
      <p>
        <a href="#ref13" id="fn13" title="Jump back to footnote 13 in the text.">[13]&nbsp;</a>
        See, for example, the Department of Public Health’s report on the
        <a
          href="https://www.phila.gov/documents/health-of-the-city/"
          target="blank_"
        >2019 Health of the City</a>.
      </p>

      <!-- Footnote #14 -->
      <p>
        <a href="#ref14" id="fn14" title="Jump back to footnote 14 in the text.">[14]&nbsp;</a>
        Shihadeh, E., and Flynn, N., “Segregation and Crime: The Effect of Black
        Social Isolation on the Rates of Urban Violence,” Social Forces, 1996,
        74:4, 1325-1252.
      </p>
    </div>
  </div>
</template>

<script>
import RedliningMap from "./components/RedliningMap.vue";
import HomicidesBarChart from "./components/HomicidesBarChart.vue";
import HomicidesMap from "./components/HomicidesMap.vue";
import DisadvantageMap from "./components/DisadvantageMap.vue";

export default {
  name: "app",
  components: {
    RedliningMap,
    HomicidesBarChart,
    HomicidesMap,
    DisadvantageMap
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a,
a:visited {
  color: #2176d2;
}
a:hover {
  color: #0f4d90;
}
</style>
