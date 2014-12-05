{{{
  "title": "College Football Rankings - The Right Way",
  "description": "College football is way too subjective. How do we fix it? With raw stats and a bit of code.",
  "date": "12-04-2014",
  "category": "Random",
  "tags": ["football", "rankings", "python", "data science"],
  "slug": "cfb-rankings-the-right-way"
}}}

***After getting WAY more viewership than I expected, I decided to post the scripts on GitHub. You can find the project [here](https://github.com/imdevin567/cfb-rankings).***

I might be a nerd, but I'm a big sports fan too. This is both nerdy and sporty, so bear with me here.

As we near the end of the 2014 college football season, it's becoming incredibly apparent just how subjective the new [CFB playoff ranking system](http://espn.go.com/college-football/rankings/_/poll/21) really is. While the old BCS system wasn't perfect, it at least gave a *fairly* unbiased ranking of the best teams in the nation. People have agendas--computers do not. The people programming those computers might, but what if we only looked at the things that really mattered?

Naturally as a sports fanatic and a guy that knows a thing or two about programming, I sought to find a fix to this madness. I first came up with a basic system that would calculate the best teams in the country. The system has only two criteria for the ratings: win/loss quality and strength of schedule.

##Win/Loss Quality
- The base value of a home win is 1 and the base value of a road loss is -1.
- The point differential of the game ***up to 28 points*** is added to a win and subtracted from a loss, with the value of each point being 0.01.
- A road win is awarded an additional touchdown (0.07) and a home loss is penalized by an additional touchdown (0.07).
- The resulting value is multiplied by the opponents' winning percentage for a win or multiplied by the inverse of the opponents' winning percentage for a loss.
- Non-FBS teams' winning percentages are cut in half (effectively making a 12-0 Div II team equivalent to a 6-6 FBS team).
- The final win/loss quality rating of a team is their average win/loss quality normalized on a scale of 0 to 1.

Let's start with an example. Early in the season, [Arizona](http://espn.go.com/college-football/team/_/id/12/arizona-wildcats) beat [Oregon](http://espn.go.com/college-football/team/_/id/2483/oregon-ducks) 31-24 on the road. To calculate the quality of Arizona's win:

- 1 point for a win
- 0.07 points for point differential
- 0.07 additional points for a road win
- 1.14 * 0.917 (Oregon's winning percentage) = 1.045

This win against the Ducks gets a rating of 1.045 for Arizona, which happened to be the 4th best win out of any team in the nation this season. Arizona is rewarded for beating a good team on the road. On the flip side, you can calculate the cost of this loss for Oregon:

- -1 points for a loss
- -0.07 points for point differential
- -0.07 additional points for a home loss
- -1.14 * 0.1667 (inverse of Arizona's winning percentage) = -0.19

As you can see, while Arizona was rewarded greatly for winning this game, Oregon was not highly penalized for losing (rated about 600th on the list of losses) against a good Arizona team.

A few notes on win/loss quality:

- Conferences are not taken into account whatsoever. This means beating a 10-2 Boise State team at home by 7 points is equivalent to beating a 10-2 Michigan State team at home by 7. I believe this is a **good** thing. Conference bias is subjective--on-the-field play is not.
- Point differential is capped at 28 points to prevent teams being ranked highly solely for blowouts.
- The final win/loss quality is the average of **all** win/loss qualities for the team normalized on a scale of 0 to 1. This ensures consistent play throughout a season in order to be ranked highly.
- Win/loss quality is **95%** of the final rating. This is mainly because it inheritly takes into account strength of opponent.

##Strength of Schedule
A team's strength of schedule is essentially the **average win/loss quality of their opponents**. This accounts for a small portion of the final ranking (5%), mainly to use as a tiebreaker between teams with similar win/loss qualities.

###Alright, enough numbers. Show me the rankings!!!
Ok, ok. Some of these are obvious, some not so much. It was interesting to take a look at these teams after the numbers ran and see what my subjective opinion was.

Ladies and gents, your 2014 College Football Rankings:

| **Rank** | **Team**                | **Record** | **Win Quality** | **SOS** | **Final Rating** |
|----------|-------------------------|------------|-----------------|---------|------------------|
| 1        | ***Florida State***     | 12-0       | 1.000           | 0.575   | ***0.979***      |
| 2        | ***Ohio State***        | 11-1       | 0.994           | 0.569   | ***0.972***      |
| 3        | ***Alabama***           | 11-1       | 0.976           | 0.638   | ***0.960***      |
| 4        | ***Oregon***            | 11-1       | 0.968           | 0.584   | ***0.948***      |
| 5        | ***TCU***               | 10-1       | 0.956           | 0.566   | ***0.936***      |
| 6        | ***Boise State***       | 10-2       | 0.938           | 0.572   | ***0.920***      |
| 7        | ***Ole Miss***          | 9-3        | 0.906           | 0.698   | ***0.896***      |
| 8        | ***Michigan State***    | 10-2       | 0.895           | 0.561   | ***0.878***      |
| 9        | ***Wisconsin***         | 10-2       | 0.890           | 0.565   | ***0.873***      |
| 10       | ***Georgia Tech***      | 10-2       | 0.886           | 0.589   | ***0.871***      |
| 11       | ***Mississippi State*** | 10-2       | 0.882           | 0.597   | ***0.868***      |
| 12       | ***UCLA***              | 9-3        | 0.872           | 0.655   | ***0.861***      |
| 13       | ***Baylor***            | 10-1       | 0.874           | 0.484   | ***0.855***      |
| 14       | ***Missouri***          | 10-2       | 0.869           | 0.573   | ***0.854***      |
| 15       | ***Arizona***           | 10-2       | 0.868           | 0.569   | ***0.853***      |
| 16       | ***Kansas State***      | 9-2        | 0.849           | 0.565   | ***0.835***      |
| 17       | ***Georgia***           | 9-3        | 0.829           | 0.599   | ***0.817***      |
| 18       | ***Auburn***            | 8-4        | 0.819           | 0.707   | ***0.814***      |
| 19       | ***Marshall***          | 11-1       | 0.829           | 0.407   | ***0.808***      |
| 20       | ***Clemson***           | 9-3        | 0.810           | 0.579   | ***0.799***      |
| 21       | ***Nebraska***          | 9-3        | 0.793           | 0.572   | ***0.782***      |
| 22       | ***Oklahoma***          | 8-3        | 0.785           | 0.574   | ***0.775***      |
| 23       | ***Colorado State***    | 10-2       | 0.771           | 0.480   | ***0.756***      |
| 24       | ***Arizona State***     | 9-3        | 0.763           | 0.584   | ***0.754***      |
| 25       | ***Louisville***        | 9-3        | 0.758           | 0.566   | ***0.749***      |

##Some Stats
Here are some interesting stats after running these rankings:

- The SEC led the way with 6 teams in the top 25. The Big Ten, ACC, Pac 10, and Big 12 each had 4 teams.
- The Big Ten led the way with 3 teams in the top 10.
- Boise State is ranked **significantly** higher here than they are in the current CFB rankings (6 and 22, respectively)
- Baylor is ranked much lower than TCU here than in the current CFB rankings.

##Final Thoughts
Obviously this brought to light some of the flaws with the current subjective ranking system. Florida State ranks #1 in this system, which should probably be the case since they are the only undefeated team. Ohio State surprisingly ranks the highest of all one-loss teams, primarily due to their high quality of wins.

At the same time, this system also highlights some of the successes of the CFB committee. Many have claimed [Baylor should be ranked ahead of TCU](http://www.nola.com/lsu/index.ssf/2014/12/should_tcu_be_ranked_above_bay.html) due to their same record with Baylor winning the head-to-head matchup. This shows that while TCU has dominated their fairly weak schedule, Baylor has not dominated their even *weaker* schedule.

I hope this generates some buzz, otherwise why bother? Let me know your thoughts below if you feel so inclined.  As for the tech part of this, all scripts were written in Python and data was grabbed from [NCAA.com](http://ncaa.com) using HTML parsing. If there is enough interest, I might post the project on GitHub.



