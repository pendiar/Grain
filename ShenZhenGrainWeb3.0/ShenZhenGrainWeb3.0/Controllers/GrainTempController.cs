using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShenZhenGrainWeb3._0.Controllers
{
    public class GrainTempController : Controller
    {
        // GET: GrainTemp
        string DBconn = ConfigurationManager.AppSettings["DBconn"];
        public ActionResult Index()
        {
            return View();
        }
        //页面一数据查询
        public string tempQueryView1()
        {
            SqlConnection conn = new SqlConnection(DBconn);
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds1 = new DataSet();
            DataSet ds2 = new DataSet();
            DataSet ds3 = new DataSet();
            DataSet ds4 = new DataSet();
            //平方仓温度
            string sql1 = "select avg(t4.temperature) perTemp,max(t4.temperature) maxTemp,min(t4.temperature) minTemp "
                        + "from [tb_warehouse] t1,tb_warehouse_receiver_relation t2, tb_receiver_transmitter_relation t3, "
                        + "tb_transmitter_temper_details t4 "
                        + "where t1.warehouseid = t2.warehouseid and t2.deviceid = t3.receiverid and t3.transmitterid = t4.transimitterid "
                        + "and t1.type = 1; ";
            //筒仓温度
            string sql2 = "select avg(t4.temperature)perTemp2,max(t4.temperature)maxTemp2,min(t4.temperature)minTemp2 "
                        + "from [tb_warehouse] t1, tb_warehouse_receiver_relation t2,tb_receiver_transmitter_relation t3, "
                        + "tb_transmitter_temper_details t4 where t1.warehouseid = t2.warehouseid and t2.deviceid = t3.receiverid "
                        + "and t3.transmitterid = t4.transimitterid and t1.type = 0; ";
            //平房仓温度
            string sql3 = "select avg(t4.temperature)perTemp3,max(t4.temperature)maxTemp3,min(t4.temperature)minTemp3 "
                        + "from [tb_warehouse] t1, tb_warehouse_receiver_relation t2,tb_receiver_transmitter_relation t3, "
                        + "tb_transmitter_temper_details t4 where t1.warehouseid = t2.warehouseid and t2.deviceid = t3.receiverid "
                        + "and t3.transmitterid = t4.transimitterid and t1.type = 2; ";
            //气膜仓温度
            string sql4 = "select avg(t4.temperature)perTemp4,max(t4.temperature)maxTemp4,min(t4.temperature)minTemp4 "
                        + "from [tb_warehouse] t1, tb_warehouse_receiver_relation t2,tb_receiver_transmitter_relation t3, "
                        + "tb_transmitter_temper_details t4 where t1.warehouseid = t2.warehouseid and t2.deviceid = t3.receiverid "
                        + "and t3.transmitterid = t4.transimitterid and t1.type = 3; ";

            sda.SelectCommand = new SqlCommand(sql1, conn);
            sda.Fill(ds1);
            sda.SelectCommand = new SqlCommand(sql2, conn);
            sda.Fill(ds2);
            sda.SelectCommand = new SqlCommand(sql3, conn);
            sda.Fill(ds3);
            sda.SelectCommand = new SqlCommand(sql4, conn);
            sda.Fill(ds4);
            string str = "";
            string str1 = "";
            string str2 = "";
            string str3 = "";
            string str4 = "";

            //平方仓
            for (int i = 0; i < ds1.Tables[0].Rows.Count; i++)
            {
               string pfMaxTemp = ds1.Tables[0].Rows[i]["maxTemp"].ToString();
               string pfMinTemp = ds1.Tables[0].Rows[i]["minTemp"].ToString();
               string pfPerTemp = ds1.Tables[0].Rows[i]["perTemp"].ToString().Substring(0,4);
                str1 = pfMaxTemp + "," + pfMinTemp + "," + pfPerTemp;
            }
            //筒仓
            for (int i = 0; i < ds2.Tables[0].Rows.Count; i++)
            {
                string tcMinTemp = ds2.Tables[0].Rows[i]["minTemp2"].ToString();
                string tcMaxTemp = ds2.Tables[0].Rows[i]["maxTemp2"].ToString();
                string tcPerTemp = ds2.Tables[0].Rows[i]["perTemp2"].ToString().Substring(0, 4);

                str2 = tcMaxTemp + "," + tcMinTemp + "," + tcPerTemp;
            }
            //平房仓
            for (int i = 0; i < ds3.Tables[0].Rows.Count; i++)
            {
                string pfMinTemp = ds3.Tables[0].Rows[i]["minTemp3"].ToString();
                string pfMaxTemp = ds3.Tables[0].Rows[i]["maxTemp3"].ToString();
                string pfPerTemp = ds3.Tables[0].Rows[i]["perTemp3"].ToString().Substring(0, 4);

                str3 = pfMaxTemp + "," + pfMinTemp + "," + pfPerTemp;
            }
            //气膜仓
            for (int i = 0; i < ds4.Tables[0].Rows.Count; i++)
            {
                string qmMinTemp = ds4.Tables[0].Rows[i]["minTemp4"].ToString();
                string qmMaxTemp = ds4.Tables[0].Rows[i]["maxTemp4"].ToString();
                string qmPerTemp = ds4.Tables[0].Rows[i]["perTemp4"].ToString().Substring(0, 4);

                str4 = qmMaxTemp + "," + qmMinTemp + "," + qmPerTemp;
            }

            str = str1 + ";" + str2 + ";" + str3 + ";" + str4;
            return str;
        }
        //页面二数据查询
        public string tempQueryView2(string granarycode)
        {
            string granaryid = "";
            string warehouseid = "3";
            if (granarycode.Substring(1,1) == "A")
            {
                granaryid = "7";
            }else if(granarycode.Substring(1, 1) == "B")
            {
                granaryid = "8";
            }

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select t1.temperature temp from tb_transmitter_temper_details t1,( "
                    + "select t4.transimitterid,t5.temperatureid,max(t5.uptime) uptime "
                    + "from tb_warehouse t1 join tb_warehouse_granary_Relation t2 on t1.warehouseid = t2.warehouseid "
                    + "join tb_granary_position_details t3 on t2.granaryid = t3.granaryid "
                    + "join tb_grain_transmitter_relation t4 on t3.graincode = t4.graincode "
                    + "join tb_transmitter_temper_details t5 on t4.transimitterid = t5.transimitterid "
                    + "where building = "+ warehouseid+" and t1.floors = 1 and t3.granaryid = " + granaryid + " and t3.graincode = '" + granarycode + "' "
                    + "group by t4.transimitterid,t5.temperatureid) t2 "
                    + "where t1.temperatureid = t2.temperatureid and t1.uptime = t2.uptime order by t1.temperatureid asc ";


            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string temp = ds.Tables[0].Rows[i]["temp"].ToString();
                str += temp + ",";
            }
            if (str != null && str != "")
            {
                //去除最后的逗号
                str = str.Substring(0, str.Length - 1);
                str = str + granarycode;
            }
            return str;
        }
        //页面四数据卡片查询(平方仓)
        public string tempQueryView4(string warehouseid)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select distinct t1.name warehouseName,t3.name guardianName,case when t1.type = 0 then '筒仓' when t1.type = 1 then '平方仓' when t1.type = 2 then '气膜仓' when t1.type = 3 then '平房仓' end warehouseType, "
                        + "t2.content content, t2.produceplace productplace, t2.receiptdate receiveDate, t2.inputdate inputdate,case when t2.type = 0 then '周转' end inputType, "
                        + "concat(t2.moisture, '%') moisture,concat(t2.incomplete, '%') incomplete ,t2.level warehouseLevel, concat(t2.capacity, 'g/L')capacity,concat(t2.impurity, '%') impurity "
                        + "from  tb_warehouse t1, tb_warehouse_log t2,tb_personinfo t3 where t1.warehouseid = t2.warehouseid and t1.type = 1 "
                        + "and t2.mgr = t3.personid and t1.warehouseid = 1 ";
            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string warehouseName = ds.Tables[0].Rows[i]["warehouseName"].ToString();//仓库名
                string guardianName = ds.Tables[0].Rows[i]["guardianName"].ToString();//保管员
                string warehouseType = ds.Tables[0].Rows[i]["warehouseType"].ToString();//仓库类型
                string content = ds.Tables[0].Rows[i]["content"].ToString();//仓库内容
                string productplace = ds.Tables[0].Rows[i]["productplace"].ToString();//产地
                string receiveDate = ds.Tables[0].Rows[i]["receiveDate"].ToString();//粮仓收货时间
                string inputdate = ds.Tables[0].Rows[i]["inputdate"].ToString();//粮食入库时间
                string inputType = ds.Tables[0].Rows[i]["inputType"].ToString();//存储类型
                string moisture = ds.Tables[0].Rows[i]["moisture"].ToString();//入仓粮食水分
                string incomplete = ds.Tables[0].Rows[i]["incomplete"].ToString();//不完善粒
                string warehouseLevel = ds.Tables[0].Rows[i]["warehouseLevel"].ToString();//仓库等级
                string capacity = ds.Tables[0].Rows[i]["capacity"].ToString();//容量
                string impurity = ds.Tables[0].Rows[i]["impurity"].ToString();//杂质
                str += warehouseName + "," + guardianName + "," + warehouseType + "," + content + "," + productplace + ","
                    + receiveDate + "," + inputdate + "," + inputType + "," + moisture + "," + incomplete + ","
                    + warehouseLevel + "," + capacity + "," + impurity;
            }
            return str;
        }
        //页面六数据卡片查询(筒仓)
        public string tempQueryView6(string warehouseid)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select distinct t1.name warehouseName,t3.name guardianName,case when t1.type = 0 then '筒仓' when t1.type = 1 then '平方仓' when t1.type = 2 then '气膜仓' when t1.type = 3 then '平房仓' end warehouseType, "
                        + "t2.content content, t2.produceplace productplace, t2.receiptdate receiveDate, t2.inputdate inputdate,case when t2.type = 0 then '周转' end inputType, "
                        + "concat(t2.moisture, '%') moisture,concat(t2.incomplete, '%') incomplete ,t2.level warehouseLevel, concat(t2.capacity, 'g/L')capacity,concat(t2.impurity, '%') impurity "
                        + "from  tb_warehouse t1, tb_warehouse_log t2,tb_personinfo t3 where t1.warehouseid = t2.warehouseid and t1.type = 0 "
                        + "and t2.mgr = t3.personid and t1.warehouseid = 2 ";
            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string warehouseName = ds.Tables[0].Rows[i]["warehouseName"].ToString();//仓库名
                string guardianName = ds.Tables[0].Rows[i]["guardianName"].ToString();//保管员
                string warehouseType = ds.Tables[0].Rows[i]["warehouseType"].ToString();//仓库类型
                string content = ds.Tables[0].Rows[i]["content"].ToString();//仓库内容
                string productplace = ds.Tables[0].Rows[i]["productplace"].ToString();//产地
                string receiveDate = ds.Tables[0].Rows[i]["receiveDate"].ToString();//粮仓收货时间
                string inputdate = ds.Tables[0].Rows[i]["inputdate"].ToString();//粮食入库时间
                string inputType = ds.Tables[0].Rows[i]["inputType"].ToString();//存储类型
                string moisture = ds.Tables[0].Rows[i]["moisture"].ToString();//入仓粮食水分
                string incomplete = ds.Tables[0].Rows[i]["incomplete"].ToString();//不完善粒
                string warehouseLevel = ds.Tables[0].Rows[i]["warehouseLevel"].ToString();//仓库等级
                string capacity = ds.Tables[0].Rows[i]["capacity"].ToString();//容量
                string impurity = ds.Tables[0].Rows[i]["impurity"].ToString();//杂质
                str += warehouseName + "," + guardianName + "," + warehouseType + "," + content + "," + productplace + ","
                    + receiveDate + "," + inputdate + "," + inputType + "," + moisture + "," + incomplete + ","
                    + warehouseLevel + "," + capacity + "," + impurity;
            }
            return str;
        }
        //页面八数据卡片查询(平房仓)
        public string tempQueryView8(string warehouseid)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select distinct t1.name warehouseName,t3.name guardianName,case when t1.type = 0 then '筒仓' when t1.type = 1 then '平方仓' when t1.type = 2 then '气膜仓' when t1.type = 3 then '平房仓' end warehouseType, "
                    + "t2.content content, t2.produceplace productplace, t2.receiptdate receiveDate, t2.inputdate inputdate,case when t2.type = 0 then '周转' end inputType, "
                    + "concat(t2.moisture, '%') moisture,concat(t2.incomplete, '%') incomplete ,t2.level warehouseLevel, concat(t2.capacity, 'g/L')capacity,concat(t2.impurity, '%') impurity "
                    + "from  tb_warehouse t1, tb_warehouse_log t2,tb_personinfo t3 "
                    + "where t1.warehouseid = t2.warehouseid and t1.type = 3 "
                    + "and t2.mgr = t3.personid and t1.warehouseid = 8; ";

            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string warehouseName = ds.Tables[0].Rows[i]["warehouseName"].ToString();//仓库名
                string guardianName = ds.Tables[0].Rows[i]["guardianName"].ToString();//保管员
                string warehouseType = ds.Tables[0].Rows[i]["warehouseType"].ToString();//仓库类型
                string content = ds.Tables[0].Rows[i]["content"].ToString();//仓库内容
                string productplace = ds.Tables[0].Rows[i]["productplace"].ToString();//产地
                string receiveDate = ds.Tables[0].Rows[i]["receiveDate"].ToString();//粮仓收货时间
                string inputdate = ds.Tables[0].Rows[i]["inputdate"].ToString();//粮食入库时间
                string inputType = ds.Tables[0].Rows[i]["inputType"].ToString();//存储类型
                string moisture = ds.Tables[0].Rows[i]["moisture"].ToString();//入仓粮食水分
                string incomplete = ds.Tables[0].Rows[i]["incomplete"].ToString();//不完善粒
                string warehouseLevel = ds.Tables[0].Rows[i]["warehouseLevel"].ToString();//仓库等级
                string capacity = ds.Tables[0].Rows[i]["capacity"].ToString();//容量
                string impurity = ds.Tables[0].Rows[i]["impurity"].ToString();//杂质
                str += warehouseName + "," + guardianName + "," + warehouseType + "," + content + "," + productplace + ","
                    + receiveDate + "," + inputdate + "," + inputType + "," + moisture + "," + incomplete + ","
                    + warehouseLevel + "," + capacity + "," + impurity;
            }
            return str;
        }
        //页面九数据卡片查询(气膜仓)
        public string tempQueryView9(string warehouseid)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select distinct t1.name warehouseName,t3.name guardianName,case when t1.type = 0 then '筒仓' when t1.type = 1 then '平方仓' when t1.type = 2 then '气膜仓' when t1.type = 3 then '平房仓' end warehouseType, "
                    + "t2.content content, t2.produceplace productplace, t2.receiptdate receiveDate, t2.inputdate inputdate,case when t2.type = 0 then '周转' end inputType, "
                    + "concat(t2.moisture, '%') moisture,concat(t2.incomplete, '%') incomplete ,t2.level warehouseLevel, concat(t2.capacity, 'g/L')capacity,concat(t2.impurity, '%') impurity "
                    + "from  tb_warehouse t1, tb_warehouse_log t2,tb_personinfo t3 "
                    + "where t1.warehouseid = t2.warehouseid and t1.type = 2 and t2.mgr = t3.personid and t1.warehouseid = 7 ";

            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string warehouseName = ds.Tables[0].Rows[i]["warehouseName"].ToString();//仓库名
                string guardianName = ds.Tables[0].Rows[i]["guardianName"].ToString();//保管员
                string warehouseType = ds.Tables[0].Rows[i]["warehouseType"].ToString();//仓库类型
                string content = ds.Tables[0].Rows[i]["content"].ToString();//仓库内容
                string productplace = ds.Tables[0].Rows[i]["productplace"].ToString();//产地
                string receiveDate = ds.Tables[0].Rows[i]["receiveDate"].ToString();//粮仓收货时间
                string inputdate = ds.Tables[0].Rows[i]["inputdate"].ToString();//粮食入库时间
                string inputType = ds.Tables[0].Rows[i]["inputType"].ToString();//存储类型
                string moisture = ds.Tables[0].Rows[i]["moisture"].ToString();//入仓粮食水分
                string incomplete = ds.Tables[0].Rows[i]["incomplete"].ToString();//不完善粒
                string warehouseLevel = ds.Tables[0].Rows[i]["warehouseLevel"].ToString();//仓库等级
                string capacity = ds.Tables[0].Rows[i]["capacity"].ToString();//容量
                string impurity = ds.Tables[0].Rows[i]["impurity"].ToString();//杂质
                str += warehouseName + "," + guardianName + "," + warehouseType + "," + content + "," + productplace + ","
                    + receiveDate + "," + inputdate + "," + inputType + "," + moisture + "," + incomplete + ","
                    + warehouseLevel + "," + capacity + "," + impurity;
            }
            return str;
        }
        //页面十 每层层温度显示查询
        public string tempQueryView10(string floor)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select t2.granaryid ,avg(t7.temperature) temperature,avg(t7.humidity) humidity from "
                    + "[dbo].tb_warehouse t1,[dbo].[tb_warehouse_granary_Relation] t2, "
                    + "[dbo].[tb_granary_position_details] t3, [dbo].[tb_warehouse_receiver_relation] t4, "
                    + "[dbo].[tb_receiver_temper_humidity_details] t5, [dbo].[tb_receiver_transmitter_relation] t6, "
                    + "[dbo].[tb_transmitter_temper_humidity_main] t7 where t1.warehouseid = t2.warehouseid "
                    + "and t2.granaryid = t3.granaryid and t3.granaryid = t4.granaryid "
                    + "and t4.deviceid = t5.reciverid and t5.reciverid = t6.receiverid "
                    + "and t6.transmitterid = t7.transmitterid and building = 3 "
                    //+ "and t2.granaryid = 8 "
                    + "and t2.floor = " + floor + " group by t2.granaryid ";

            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string temperature = ds.Tables[0].Rows[i]["temperature"].ToString().Substring(0,2);//温度
                string humidity = ds.Tables[0].Rows[i]["humidity"].ToString().Substring(0, 2);//湿度
                //string granaryid = "7";
                string granaryid = ds.Tables[0].Rows[i]["granaryid"].ToString().Substring(0, 1);//廒间id
                str += temperature + humidity + granaryid + ";";
            }
            if(str != "")
            {
                str.Substring(0, str.Length - 1);
            }
            return str;
        }
        //页面十一 每粮堆温度显示查询
        public string tempQueryView11(string granaryid)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select distinct a.building,a.floors,a.granaryid,a.graincode,a.postionx,a.postiony,case when c.temperature is not null then 1 else 0 end havetemprt from "
                    + "(select t1.building, t1.floors, t2.granaryid, t3.graincode, t3.postionx, t3.postiony "
                    + "from tb_warehouse t1 join tb_warehouse_granary_Relation t2 on t1.warehouseid = t2.warehouseid "
                    + "join tb_granary_position_details t3 on t2.granaryid = t3.granaryid "
                    + "where building = 3 and t1.floors = 1 and t3.granaryid = " + granaryid;

                sql += " ) a left join tb_grain_transmitter_relation b on a.graincode = b.graincode and a.granaryid = b.granaryid "
                    + "left join tb_transmitter_temper_details c on b.transimitterid = c.transimitterid and c.isactive = 1 ";

            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                string postionx = ds.Tables[0].Rows[i]["postionx"].ToString();//x坐标
                string postiony = ds.Tables[0].Rows[i]["postiony"].ToString();//y坐标
                string graincode = ds.Tables[0].Rows[i]["graincode"].ToString();//粮堆code
                string havetemprt = ds.Tables[0].Rows[i]["havetemprt"].ToString();//粮堆code
                str += postionx + "," + postiony + "," + graincode + "," + havetemprt + ";";
            }
            str.Substring(0, str.Length - 1);
            return str;
        }
        //页面五 表格查询
        public string tempQueryView12(string id)
        {

            SqlConnection conn = new SqlConnection(DBconn);
            //SqlConnection conn = new SqlConnection("Server = 122.224.175.219; database = IOTTEST; uid = sa; pwd = Admin123$");
            SqlDataAdapter sda = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string sql = "select t1.temperature temp from tb_transmitter_temper_details t1,( "
                     + "select t4.transimitterid,t5.temperatureid,max(t5.uptime) uptime "
                     + "from tb_warehouse t1 join tb_warehouse_granary_Relation t2 on t1.warehouseid = t2.warehouseid "
                     + "join tb_granary_position_details t3 on t2.granaryid = t3.granaryid "
                     + "join tb_grain_transmitter_relation t4 on t3.graincode = t4.graincode "
                     + "join tb_transmitter_temper_details t5 on t4.transimitterid = t5.transimitterid "
                     + "where building = 3 and t1.floors = 1 and t3.granaryid = 7 and t3.graincode = '" + id + "' "
                     + "group by t4.transimitterid,t5.temperatureid) t2 "
                     + "where t1.temperatureid = t2.temperatureid and t1.uptime = t2.uptime order by t1.temperatureid asc ";

            sda.SelectCommand = new SqlCommand(sql, conn);
            sda.Fill(ds);
            string str = "";
            string temp1 = ds.Tables[0].Rows[0]["temp"].ToString();//温度
            string temp2 = ds.Tables[0].Rows[1]["temp"].ToString();//温度
            string temp3 = ds.Tables[0].Rows[2]["temp"].ToString();//温度
            string temp4 = ds.Tables[0].Rows[3]["temp"].ToString();//温度
            string temp5 = ds.Tables[0].Rows[4]["temp"].ToString();//温度
            string temp6 = ds.Tables[0].Rows[5]["temp"].ToString();//温度
            string temp7 = ds.Tables[0].Rows[6]["temp"].ToString();//温度
            string temp8 = ds.Tables[0].Rows[7]["temp"].ToString();//温度
            string temp9 = ds.Tables[0].Rows[8]["temp"].ToString();//温度
            string temp10 = ds.Tables[0].Rows[9]["temp"].ToString();//温度
            string temp11 = ds.Tables[0].Rows[10]["temp"].ToString();//温度
            string temp12 = ds.Tables[0].Rows[11]["temp"].ToString();//温度
            string temp13 = ds.Tables[0].Rows[12]["temp"].ToString();//温度
            string temp14 = ds.Tables[0].Rows[13]["temp"].ToString();//温度
            string temp15 = ds.Tables[0].Rows[14]["temp"].ToString();//温度
            string temp16 = ds.Tables[0].Rows[15]["temp"].ToString();//温度
            string temp17 = ds.Tables[0].Rows[16]["temp"].ToString();//温度
            string temp18 = ds.Tables[0].Rows[17]["temp"].ToString();//温度
            string temp19 = ds.Tables[0].Rows[18]["temp"].ToString();//温度
            string temp20 = ds.Tables[0].Rows[19]["temp"].ToString();//温度
            string temp21 = ds.Tables[0].Rows[20]["temp"].ToString();//温度
            string temp22 = ds.Tables[0].Rows[21]["temp"].ToString();//温度
            string temp23 = ds.Tables[0].Rows[22]["temp"].ToString();//温度
            string temp24 = ds.Tables[0].Rows[23]["temp"].ToString();//温度
            string temp25 = ds.Tables[0].Rows[24]["temp"].ToString();//温度
            string temp26 = ds.Tables[0].Rows[25]["temp"].ToString();//温度
            string temp27 = ds.Tables[0].Rows[26]["temp"].ToString();//温度
            
            SqlDataAdapter sda1 = new SqlDataAdapter();
            DataSet ds1 = new DataSet();
            string sql1 = "select t1.value temp from tb_grain t1 where rdate=(select max(rdate) from tb_grain)";
            sda1.SelectCommand = new SqlCommand(sql1, conn);
            sda1.Fill(ds1);
            temp1 = ds1.Tables[0].Rows[0]["temp"].ToString();//温度
            temp2 = ds1.Tables[0].Rows[1]["temp"].ToString();//温度
            if (ds1.Tables[0].Rows.Count > 2)
            {
                temp3 = ds1.Tables[0].Rows[2]["temp"].ToString();//温度
                temp4 = ds1.Tables[0].Rows[3]["temp"].ToString();//温度
                temp5 = ds1.Tables[0].Rows[4]["temp"].ToString();//温度
                temp6 = ds1.Tables[0].Rows[5]["temp"].ToString();//温度
                temp7 = ds1.Tables[0].Rows[6]["temp"].ToString();//温度
                temp8 = ds1.Tables[0].Rows[7]["temp"].ToString();//温度
                temp9 = ds1.Tables[0].Rows[8]["temp"].ToString();//温度
            }

            //str = "[{\"temp1\":"+temp+",\"temp2\":2,\"temp3\":3,\"temp4\":4,\"temp5\":5,\"temp6\":6,\"temp7\":7,\"temp8\":8,\"temp9\":9}]";
            //str.Substring(0, str.Length - 1);
            //string str = "{\"temp1\":\"1\",\"temp2\":\"2\",\"temp3\":\"3\",\"temp4\":\"4\",\"temp5\":\"5\",\"temp6\":\"6\",\"temp7\":\"7\",\"temp8\":\"8\",\"temp9\":\"9\"}";
            //str = "{\"data\":[" + str + "]}";
            str = "[{\"temp1\":"+temp1+",\"temp2\":"+temp2+ ",\"temp3\":"+temp3+",\"temp4\":"+ temp4 + ",\"temp5\":"+ temp5 + ",\"temp6\":"+ temp6 + ",\"temp7\":"+ temp7 + ",\"temp8\":"+temp8+",\"temp9\":"+temp9+"},"
                + "{\"temp1\":" + temp10 + ",\"temp2\":" + temp11 + ",\"temp3\":" + temp12 + ",\"temp4\":" + temp13 + ",\"temp5\":" + temp14 + ",\"temp6\":" + temp15 + ",\"temp7\":" + temp16 + ",\"temp8\":" + temp17 + ",\"temp9\":" + temp18 + "},"
                + "{\"temp1\":" + temp19 + ",\"temp2\":" + temp20 + ",\"temp3\":" + temp21 + ",\"temp4\":" + temp22 + ",\"temp5\":" + temp23 + ",\"temp6\":" + temp24 + ",\"temp7\":" + temp25 + ",\"temp8\":" + temp26 + ",\"temp9\":" + temp27 + "}"
                + "]";
            return str;
        }
    }
}