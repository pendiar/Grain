﻿using System.Web;
using System.Web.Mvc;

namespace ShenZhenGrainWeb3._0
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
