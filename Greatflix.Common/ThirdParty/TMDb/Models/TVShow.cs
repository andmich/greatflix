using System;
using System.Collections.Generic;
using System.Text;

namespace Greatflix.Common.ThirdParty.TMDb.Models
{
    public class TVShow : FilmBase
    {
        public List<int> episode_run_time { get; set; }
        public string first_air_date { get; set; }
        public List<string> origin_country { get; set; }
        public bool in_production { get; set; }
        public string last_air_date { get; set; }
        public Episode last_episode_to_air { get; set; }
        public string name { get; set; }
        public Episode next_episode_to_air { get; set; } = null;
        public List<Network> networks { get; set; }
        public int number_of_episodes { get; set; }
        public int number_of_seasons { get; set; }
        public string original_name { get; set; }
        public List<ProductionCompany> production_companies { get; set; }
        public List<Season> seasons { get; set; }
        public string type { get; set; }
    }
}
