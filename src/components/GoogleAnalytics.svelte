<script>
import { IDAnalytics } from "@/config";
  import { stores } from '@sapper/app';
  const { page } = stores();

  $: {
    if (typeof gtag !== "undefined"){
      gtag("config", IDAnalytics, {
        page_path: $page.path
      });
    }
  }
</script>
