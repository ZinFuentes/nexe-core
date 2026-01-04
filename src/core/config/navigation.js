import { 
  LayoutDashboard, 
  UserCircle, 
  BookOpen, 
  Users, 
  FileText, 
  Settings 
} from 'lucide-react';

// Asumo que este archivo existe basándome en tu primer snippet. 
// Si no, avísame y creamos los tokens.
import { TOKENS } from '../../design/tokens'; 

export const NAVIGATION_CONFIG = {
  // Grupo 1: Contexto Operativo (Vistas principales)
  dashboards: [
    { 
      key: 'school', 
      label: "L'escola, avui", 
      path: '/school', 
      icon: LayoutDashboard, // Mejor que 'School' para un dashboard
      color: TOKENS.colors.module.school 
    },
    { 
      key: 'me', 
      label: 'El meu espai', 
      path: '/me', 
      icon: UserCircle, 
      color: TOKENS.colors.module.me 
    }
  ],

  // Grupo 2: Entidades de Datos (Repositorios)
  repositories: [
    { 
      key: 'knowledge', 
      label: 'Sabers', 
      path: '/knowledge', 
      icon: BookOpen, 
      color: TOKENS.colors.module.knowledge 
    },
    { 
      key: 'people', 
      label: 'Persones', 
      path: '/people', 
      icon: Users, 
      color: TOKENS.colors.module.people 
    },
    { 
      key: 'papers', 
      label: 'Papers', 
      path: '/papers', 
      icon: FileText, 
      color: TOKENS.colors.module.papers 
    },
    { 
      key: 'management', 
      label: 'Gestió', 
      path: '/management', 
      icon: Settings, // 'Settings' es el estándar para gestión/admin
      color: TOKENS.colors.module.management 
    }
  ]
};

// Helper por si alguna vez necesitas iterar todo plano (ej. rutas de Router)
export const FLAT_NAV_ITEMS = [
  ...NAVIGATION_CONFIG.dashboards, 
  ...NAVIGATION_CONFIG.repositories
];