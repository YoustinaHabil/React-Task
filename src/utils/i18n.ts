import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', 
    resources: {
      en: {
        translation: {
          title: "Posts by User",
          username: "Username",
          posts: "Posts",
          postTitle: "Post Title",
          errorMessage: "Something went wrong. Please try again later.",
          loading: "Loading...",
          viewPost: "View Post",
          allPosts: "All Posts",
          searchPlaceholder: "Search by User Name",
          sortByIdAsc: "Sort by ID (Ascending)",
          sortByIdDesc: "Sort by ID (Descending)",
          sortByTitleAsc: "Sort by Title (Ascending)",
          sortByTitleDesc: "Sort by Title (Descending)",
          loadMore: "Load More",
          viewDetails: "View Details",
          userId: "User ID",
          error: "An error occurred. Please try again later.",
          postDetails: "Post Details",
          delete: "Delete",
          edit: "Edit",
          save: "Save",
          successDeleting: "Post deleted successfully.",
          failedDeleting: "Failed to delete the post.",
          errorDeleting: "An error occurred while deleting the post.",
          successUpdating: "Post updated successfully.",
          failedUpdating: "Failed to update the post.",
          confirmDelete: "Are you sure you want to delete this post?",
          yes: "Yes",
          no: "No",
          titleRequired:"titleRequired",
          titleLenght100: "titleMaxLength 100",
          descriptionRequired:"descriptionRequired",
          descriprtionLenght500:  "descriptionMaxLength 500",
        }
      },
      ar: {
        translation: {
          title: "المشاركات حسب المستخدم",
          username: "اسم المستخدم",
          posts: "المشاركات",
          postTitle: "عنوان المشاركة",
          errorMessage: "حدث خطأ ما. الرجاء المحاولة لاحقًا.",
          loading: "جارٍ التحميل...",
          viewPost: "عرض المشاركة",
          allPosts: "جميع المنشورات",
          searchPlaceholder: "ابحث باستخدام اسم المستخدم",
          sortByIdAsc: "ترتيب حسب الرقم (تصاعدي)",
          sortByIdDesc: "ترتيب حسب الرقم (تنازلي)",
          sortByTitleAsc: "ترتيب حسب العنوان (تصاعدي)",
          sortByTitleDesc: "ترتيب حسب العنوان (تنازلي)",
          loadMore: "تحميل المزيد",
          viewDetails: "عرض التفاصيل",
          userId: "رقم المستخدم",
          error: "حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.",
          postDetails: "تفاصيل المنشور",
          delete: "حذف",
          edit: "تعديل",
          save: "حفظ",
          successDeleting: "تم حذف المنشور بنجاح.",
          failedDeleting: "فشل في حذف المنشور.",
          errorDeleting: "حدث خطأ أثناء حذف المنشور.",
          successUpdating: "تم تحديث المنشور بنجاح.",
          failedUpdating: "فشل في تحديث المنشور.",
          confirmDelete: "هل انت متأكد من حذف هذا المنشور?",
          yes: "نعم",
          no: "لا",
          titleRequired:"العنوان مطلوب",
          titleLenght100: "العنوان يجب أن يكون بحد أقصى 100 حرف",
          descriptionRequired:"الوصف مطلوب",
          descriprtionLenght500:  "الوصف يجب ان يكون بحد اقصي 500",



        }
      }
    },
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
