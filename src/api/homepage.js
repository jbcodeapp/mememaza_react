import { SITE_URL } from "@/def";
import axios from "axios";

export const fetchHomePageData = () => axios.get(SITE_URL + `/post`);
