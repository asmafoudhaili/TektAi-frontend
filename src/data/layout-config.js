const data = [
  {
    variant: 1,
    header: {
      dark: false,
      toggleDark: true,
      border: true,
      transparent: false,
      bgColor: "white",
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "outlilne",
          color: "primary"
        }
      },
    },
    footer: {
      variant: 1,
      logo: {
        name: "s1",
        variant: "light"
      }
    }
  }, {
    variant: 2,
    header: {
      dark: false,
      toggleDark: true,
      border: true,
      transparent: false,
      bgColor: "white",
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "outlilne",
          color: "indigo"
        }
      },
    },
    footer: {
      variant: 2,
      logo: {
        name: "s1",
        variant: "dark"
      }
    }
  }, {
    variant: 3,
    header: {
      dark: false,
      toggleDark: true,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "purple rounded-lg-3"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }
  }, {
    variant: 4,
    header: {
      dark: false,
      toggleDark: true,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "indigo"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }
  }, {
    variant: 5,
    header: {
      dark: false,
      toggleDark: true,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag-fill",
        label: "Sign In",
        variant: {
          type: "outline",
          color: "dark"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }
  }, {
    variant: 6,
    header: {
      dark: false,
      toggleDark: true,
      border: true,
      transparent: false,
      bgColor: "white",
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag-fill",
        label: "Sign In",
        variant: {
          type: "outline",
          color: "dark"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s3",
        variant: "dark"
      }
    }
  }, {
    variant: 7,
    header: {
      dark: true,
      toggleDark: false,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag-fill",
        label: "Sign In",
        variant: {
          type: "outline",
          color: "white"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }
  }, {
    variant: 8,
    header: {
      dark: true,
      toggleDark: false,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: true,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "primary-alt"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }

  }, {
    variant: 9,
    header: {
      dark: false,
      toggleDark: true,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag-fill",
        label: "Sign In",
        variant: {
          type: "outline",
          color: "dark"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s3",
        variant: "dark"
      }
    }
  }, {
    variant: 10,
    header: {
      dark: true,
      toggleDark: false,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "purple border-0 rounded-0"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "light"
      }
    }

  }, {
    variant: 11,
    header: {
      dark: true,
      toggleDark: false,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "info"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }
  }, {
    variant: 12,
    header: {
      dark: true,
      toggleDark: false,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "primary-alt"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    },
  }, {
    variant: 13, // data-driven
    header: {
      dark: false,
      toggleDark: false,
      border: false,
      transparent: false,
      bgColor: "white",
      activeBg: "white",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "primary-alt"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s1",
        variant: "dark"
      }
    },
  }, {
    variant: 14,
    header: {
      dark: true,
      toggleDark: true,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag-fill",
        label: "Sign In",
        variant: {
          type: "outline",
          color: "white"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s3",
        variant: "dark"
      }
    }
  }, {
    variant: 15,
    header: {
      dark: true,
      toggleDark: true,
      border: false,
      transparent: true,
      bgColor: null,
      activeBg: "dark",
      actBtn: {
        url: "/auth/login",
        rounded: false,
        icon: "bag",
        label: "Sign In",
        variant: {
          type: "bg",
          color: "indigo"
        }
      }
    },
    footer: {
      variant: 2,
      logo: {
        name: "s2",
        variant: "dark"
      }
    }
  }
]

export default data;